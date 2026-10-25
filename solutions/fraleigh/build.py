#!/usr/bin/env python3
"""Validate and build the complete Fraleigh seventh-edition solution collection."""
import argparse
from concurrent.futures import ThreadPoolExecutor
import json
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import zipfile

ROOT = Path(__file__).resolve().parent
BAD_LOG_MARKERS = ("Overfull", "undefined references", "multiply defined",
                   "Missing character", "duplicate ignored", "duplicate destination")


def section_key(section):
    return 57 if section == "A" else int(section)


def stem(section):
    return "section-A" if section == "A" else f"section-{int(section):02}"


def load_groups(selected=None):
    inventory = json.loads((ROOT / "inventory.json").read_text())
    expected = {str(g["section"]): g for g in inventory["groups"]}
    required = {str(n) for n in range(57)} | {"A"}
    if set(expected) != required:
        raise RuntimeError("Inventory must cover Sections 0–56 and Appendix A exactly")
    groups = []
    for path in ROOT.glob("section-*.json"):
        group = json.loads(path.read_text())
        key = str(group["section"])
        if key not in expected or path.stem != stem(group["section"]):
            raise RuntimeError(f"Unexpected group metadata: {path.name}")
        if selected is not None and key != selected:
            continue
        for field in ("part", "title", "exercise_count", "source_pages"):
            if field not in group:
                raise RuntimeError(f"{path.name}: missing {field}")
        if type(group["exercise_count"]) is not int or group["exercise_count"] < 1:
            raise RuntimeError(f"{path.name}: exercise_count must be positive")
        if not group["source_pages"] or any(type(p) is not int or not 1 <= p <= 520
                                            for p in group["source_pages"]):
            raise RuntimeError(f"{path.name}: valid source PDF pages are required")
        if group["source_pages"] != sorted(set(group["source_pages"])):
            raise RuntimeError(f"{path.name}: source pages must be sorted and unique")
        if group.get("blocked_exercises"):
            raise RuntimeError(f"{path.name}: unresolved exercises {group['blocked_exercises']}")
        for field in ("part", "exercise_count", "source_pages"):
            if field not in expected[key] or group[field] != expected[key][field]:
                raise RuntimeError(f"{path.name}: {field} differs from source inventory")
        groups.append(group)
    if selected is None and {str(g["section"]) for g in groups} != required:
        missing = required - {str(g["section"]) for g in groups}
        raise RuntimeError(f"Missing section metadata: {sorted(missing, key=section_key)}")
    if selected is not None:
        groups = [g for g in groups if str(g["section"]) == selected]
        if not groups:
            raise RuntimeError(f"No group metadata found for Section {selected}")
    return inventory, sorted(groups, key=lambda g: section_key(g["section"]))


def check_group(group):
    path = ROOT / (stem(group["section"]) + "-solutions.tex")
    contents = path.read_text()
    actual = re.findall(r"\\exercise\{([^}]+)\}", contents)
    expected = [f"{group['section']}.{n}" for n in range(1, group["exercise_count"] + 1)]
    if actual != expected:
        raise RuntimeError(f"{path.name}: exercise heading sequence differs from inventory")
    if len(re.findall(r"\\section\{", contents)) != 1:
        raise RuntimeError(f"{path.name}: expected exactly one section heading")
    print(f"Section {group['section']}: {len(actual)} exercise headings verified", flush=True)


def tex_escape(text):
    return (text.replace("&", r"\&").replace("_", r"\_")
            .replace("%", r"\%").replace("Gröbner", r"Gr\"obner"))


def wrapper(title, groups):
    chunks = []
    for group in groups:
        section = str(group["section"])
        chunks.append("\n".join([
            rf"\renewcommand{{\thesection}}{{{section}}}",
            rf"\renewcommand{{\theHsection}}{{fraleigh.{section}}}",
            rf"\input{{{stem(group['section'])}-solutions.tex}}",
        ]))
    return "\n".join([
        r"\input{preamble.tex}",
        r"\title{\textbf{A First Course in Abstract Algebra}\\[0.3em]" + tex_escape(title) +
        r"\\[0.3em]\large Detailed worked solutions}",
        r"\author{Mathjock}", r"\date{}", r"\begin{document}",
        r"\maketitle", r"\bookinfo", r"\tableofcontents", r"\clearpage",
        "\n\\clearpage\n".join(chunks), r"\end{document}", "",
    ])


def compile_pdf(target, output):
    result = subprocess.run([
        "latexmk", "-pdf", "-interaction=nonstopmode", "-halt-on-error",
        "-file-line-error", f"-outdir={output}", target + ".tex",
    ], cwd=ROOT, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    if result.returncode:
        raise RuntimeError(f"{target}: compilation failed\n{result.stdout}")
    log = (output / (target + ".log")).read_text(errors="replace")
    problems = [line for line in log.splitlines()
                if any(marker in line for marker in BAD_LOG_MARKERS)]
    if problems:
        raise RuntimeError(f"{target}: layout/reference errors\n" + "\n".join(problems))
    pdf = output / (target + ".pdf")
    if not pdf.is_file() or not pdf.read_bytes().startswith(b"%PDF-"):
        raise RuntimeError(f"{target}: invalid or missing PDF")
    print(f"Built {target}.pdf ({pdf.stat().st_size:,} bytes)", flush=True)


def archive_sources():
    paths = (sorted(ROOT.glob("*.tex")) + sorted(ROOT.glob("*.json")) +
             sorted(ROOT.glob("*.md")) + sorted(ROOT.glob("*.py")))
    with zipfile.ZipFile(ROOT / "fraleigh-latex.zip", "w", zipfile.ZIP_DEFLATED) as archive:
        for path in paths:
            entry = zipfile.ZipInfo(path.name, date_time=(2026, 1, 1, 0, 0, 0))
            entry.compress_type = zipfile.ZIP_DEFLATED
            entry.external_attr = 0o644 << 16
            archive.writestr(entry, path.read_bytes())
    print(f"Created fraleigh-latex.zip ({len(paths)} source files)", flush=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check-only", action="store_true")
    parser.add_argument("--section", help="Build one section, e.g. 0, 12, or A")
    parser.add_argument("--jobs", type=int, default=2)
    args = parser.parse_args()
    if args.jobs < 1:
        parser.error("--jobs must be positive")
    inventory, groups = load_groups(args.section)
    for group in groups:
        check_group(group)
    print("Heading checks verify numbering; mathematical review is separate.", flush=True)
    if args.check_only:
        return
    if not shutil.which("latexmk"):
        raise RuntimeError("Install latexmk and the TeX dependencies listed in README.md")
    targets = []
    for group in groups:
        target = "fraleigh-" + stem(group["section"])
        title = ("Appendix: Matrix Algebra" if group["section"] == "A" else
                 f"Section {group['section']}: {group['title']}")
        (ROOT / (target + ".tex")).write_text(wrapper(title, [group]))
        targets.append(target)
    if args.section is None:
        for part in range(1, 11):
            members = [g for g in groups if g["part"] == part]
            target = f"fraleigh-part-{part}"
            name = next(p["title"] for p in inventory["parts"] if p["part"] == part)
            (ROOT / (target + ".tex")).write_text(wrapper(f"Part {part}: {name}", members))
            targets.append(target)
        target = "fraleigh-complete"
        (ROOT / (target + ".tex")).write_text(wrapper(
            "Sections 0--56 and the matrix appendix: collected solutions", groups))
        targets.append(target)
    with tempfile.TemporaryDirectory(prefix="mathjock-fraleigh-build-") as temporary:
        output = Path(temporary)
        with ThreadPoolExecutor(max_workers=args.jobs) as pool:
            list(pool.map(lambda target: compile_pdf(target, output), targets))
        for target in targets:
            shutil.copyfile(output / (target + ".pdf"), ROOT / (target + ".pdf"))
    if args.section is None:
        archive_sources()


if __name__ == "__main__":
    main()
