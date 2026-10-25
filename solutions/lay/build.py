#!/usr/bin/env python3
"""Build validated Lay exercise groups, chapter collections, and source archives."""
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


def load_groups():
    groups = []
    for metadata in ROOT.glob("section-*.json"):
        group = json.loads(metadata.read_text())
        for field in ("chapter", "section", "title", "exercise_count", "practice_count", "source_pages"):
            if field not in group:
                raise RuntimeError(f"{metadata.name}: missing {field}")
        if not isinstance(group["exercise_count"], int) or group["exercise_count"] < 1:
            raise RuntimeError(f"{metadata.name}: exercise_count must be positive")
        if not isinstance(group["practice_count"], int) or group["practice_count"] < 0:
            raise RuntimeError(f"{metadata.name}: practice_count cannot be negative")
        if not group["source_pages"] or any(not isinstance(p, int) or p < 1 for p in group["source_pages"]):
            raise RuntimeError(f"{metadata.name}: source PDF pages are required")
        group["stem"] = metadata.stem
        group["key"] = f"{group['chapter']}.{group['section']}"
        groups.append(group)
    return sorted(groups, key=lambda g: (int(g["chapter"]),
                                        g["section"] if isinstance(g["section"], int) else 10000))


def check_group(group):
    source = ROOT / (group["stem"] + "-solutions.tex")
    text = source.read_text()
    actual = re.findall(r"\\exercise\{([^}]+)\}", text)
    expected = [f"{group['key']}.{n}" for n in range(1, group["exercise_count"] + 1)]
    if actual != expected:
        raise RuntimeError(f"{source.name}: expected {expected}, got {actual}")
    practice = re.findall(r"\\practice\{([^}]+)\}", text)
    expected_practice = [f"{group['key']}.P{n}" for n in range(1, group["practice_count"] + 1)]
    if practice != expected_practice:
        raise RuntimeError(f"{source.name}: expected practices {expected_practice}, got {practice}")
    print(f"{group['key']}: {len(actual)} exercises, {len(practice)} practice problems", flush=True)


def wrapper(title, sources):
    chunks = []
    for name in sources:
        match = re.fullmatch(r"section-(\d+)-(\d+|supplementary)-solutions.tex", name)
        if match is None:
            raise RuntimeError(f"Unexpected source filename: {name}")
        chapter, section = match.groups()
        number = f"{chapter}.S" if section == "supplementary" else rf"{chapter}.\arabic{{section}}"
        counter = 0 if section == "supplementary" else int(section) - 1
        chunks.append(rf"\renewcommand{{\thesection}}{{{number}}}" + "\n" +
                      rf"\renewcommand{{\theHsection}}{{{number}}}" + "\n" +
                      rf"\setcounter{{section}}{{{counter}}}" + "\n" +
                      rf"\input{{{name}}}")
    inputs = "\n\\clearpage\n".join(chunks)
    title = title.replace("&", r"\&").replace("_", r"\_").replace("%", r"\%")
    return "\n".join([
        r"\input{preamble.tex}",
        r"\title{\textbf{Linear Algebra and Its Applications}\\[0.3em]" + title +
        r"\\[0.3em]\large Detailed worked solutions}",
        r"\author{Mathjock}", r"\date{}", r"\begin{document}",
        r"\maketitle", r"\bookinfo", r"\tableofcontents", r"\clearpage",
        inputs, r"\end{document}", ""])


def compile_pdf(target, output):
    command = ["latexmk", "-pdf", "-interaction=nonstopmode", "-halt-on-error",
               "-file-line-error", f"-outdir={output}", target + ".tex"]
    result = subprocess.run(command, cwd=ROOT, text=True, stdout=subprocess.PIPE,
                            stderr=subprocess.STDOUT)
    if result.returncode:
        raise RuntimeError(f"{target}: compilation failed\n{result.stdout}")
    log = (output / (target + ".log")).read_text(errors="replace")
    issues = [line for line in log.splitlines() if any(marker in line for marker in
              ("Overfull", "undefined references", "multiply defined", "Missing character",
               "duplicate ignored", "duplicate destination"))]
    if issues:
        raise RuntimeError(target + ": fix layout/references\n" + "\n".join(issues))
    pdf = output / (target + ".pdf")
    if not pdf.is_file() or not pdf.read_bytes().startswith(b"%PDF-"):
        raise RuntimeError(f"{target}: missing or invalid PDF")
    print(f"Built {target}.pdf ({pdf.stat().st_size:,} bytes)", flush=True)


def archive_sources():
    sources = (sorted(ROOT.glob("*.tex")) + sorted(ROOT.glob("*.json")) +
               sorted(ROOT.glob("*.md")) + [ROOT / "build.py"])
    with zipfile.ZipFile(ROOT / "lay-latex.zip", "w", zipfile.ZIP_DEFLATED) as archive:
        for source in sources:
            metadata = zipfile.ZipInfo(source.name, date_time=(2026, 1, 1, 0, 0, 0))
            metadata.compress_type = zipfile.ZIP_DEFLATED
            metadata.external_attr = 0o644 << 16
            archive.writestr(metadata, source.read_bytes())
    print("Created lay-latex.zip")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check-only", action="store_true")
    parser.add_argument("--group", help="Build one group, e.g. 1.1 or 1.S")
    parser.add_argument("--jobs", type=int, default=2)
    args = parser.parse_args()
    if args.jobs < 1:
        parser.error("--jobs must be positive")
    groups = load_groups()
    if args.group:
        groups = [g for g in groups if g["key"] == args.group]
    else:
        inventory = json.loads((ROOT / "inventory.json").read_text())
        required = {f"{g['chapter']}.{g['section']}" for g in inventory["groups"]}
        recorded = {g["key"] for g in groups}
        if required != recorded:
            raise RuntimeError(f"Printed-book inventory mismatch; missing {sorted(required-recorded)}, "
                               f"unexpected {sorted(recorded-required)}")
    if not groups:
        parser.error("No completed group metadata found")
    for group in groups:
        if group.get("blocked_exercises"):
            raise RuntimeError(f"{group['key']}: unresolved source/data requirements: {group['blocked_exercises']}")
        check_group(group)
    print("Heading checks confirm numbering/order; mathematical verification is separate.")
    if args.check_only:
        return
    if not shutil.which("latexmk"):
        raise RuntimeError("Install latexmk and the TeX packages listed in README.md")
    targets = []
    for group in groups:
        target = "lay-" + group["stem"]
        (ROOT / (target + ".tex")).write_text(wrapper(
            f"Section {group['key']}: {group['title']}",
            [group["stem"] + "-solutions.tex"]))
        targets.append(target)
    if args.group is None:
        for chapter in dict.fromkeys(g["chapter"] for g in groups):
            members = [g for g in groups if g["chapter"] == chapter]
            target = f"lay-chapter-{chapter}"
            (ROOT / (target + ".tex")).write_text(wrapper(f"Chapter {chapter}",
                [g["stem"] + "-solutions.tex" for g in members]))
            targets.append(target)
        target = "lay-complete"
        (ROOT / (target + ".tex")).write_text(wrapper("Printed Chapters 1--8: collected worked solutions",
            [g["stem"] + "-solutions.tex" for g in groups]))
        targets.append(target)
    with tempfile.TemporaryDirectory(prefix="mathjock-lay-build-") as temporary:
        output = Path(temporary)
        with ThreadPoolExecutor(max_workers=args.jobs) as pool:
            list(pool.map(lambda target: compile_pdf(target, output), targets))
        for target in targets:
            shutil.copyfile(output / (target + ".pdf"), ROOT / (target + ".pdf"))
    if args.group is None:
        archive_sources()


if __name__ == "__main__":
    main()
