#!/usr/bin/env python3
"""Validate coverage, compile the Ross solutions, and archive their sources."""
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
SECTIONS = json.loads((ROOT / "sections.json").read_text())
VOLUMES = ["ross-chapter-3-sections-21-22", "ross-chapter-4-sections-23-27",
           "ross-chapter-5-sections-28-31", "ross-chapter-6-sections-32-36",
           "ross-chapter-7-sections-37-38", "ross-sections-21-38"]


def expanded_source(path, ancestors=()):
    path = path.resolve()
    if path.parent != ROOT or path in ancestors:
        raise RuntimeError(f"Invalid or circular input: {path.name}")

    def include(match):
        name = match.group(1)
        return expanded_source(ROOT / (name if name.endswith(".tex") else name + ".tex"),
                               ancestors + (path,))

    return re.sub(r"\\input\{([^}]+)\}", include, path.read_text())


def check_coverage():
    for item in SECTIONS:
        section, count = item["section"], item["count"]
        source = ROOT / f"section-{section}-solutions.tex"
        text = expanded_source(source)
        actual = re.findall(r"\\exercise\{(\d+\.\d+)\}", text)
        expected = [f"{section}.{n}" for n in range(1, count + 1)]
        if actual != expected:
            raise RuntimeError(f"{source.name}: expected {expected}, found {actual}")
        print(f"Section {section}: all {count} exercise headings in order", flush=True)
    print("Coverage: 214 exercises (heading/order check; mathematical review is separate).")


def compile_pdf(target, output):
    result = subprocess.run(
        ["latexmk", "-pdf", "-interaction=nonstopmode", "-halt-on-error",
         "-file-line-error", f"-outdir={output}", target + ".tex"],
        cwd=ROOT, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    if result.returncode:
        raise RuntimeError(f"Build failed: {target}\n{result.stdout}")
    log = (output / (target + ".log")).read_text(errors="replace")
    warnings = [line for line in log.splitlines()
                if any(marker in line for marker in
                       ("Overfull", "undefined references", "multiply defined",
                        "Missing character", "LaTeX Warning: Reference"))]
    if warnings:
        raise RuntimeError(f"{target}: resolve warnings:\n" + "\n".join(warnings))
    pdf = output / (target + ".pdf")
    if not pdf.is_file() or not pdf.read_bytes().startswith(b"%PDF-"):
        raise RuntimeError(f"Missing or invalid PDF: {target}")
    print(f"Compiled {target}.pdf ({pdf.stat().st_size:,} bytes)", flush=True)


def archive_sources():
    sources = sorted(ROOT.glob("*.tex")) + [ROOT / name for name in
                                           ("README.md", "build.py", "sections.json")]
    with zipfile.ZipFile(ROOT / "ross-sections-21-38-latex.zip", "w",
                         zipfile.ZIP_DEFLATED) as archive:
        for source in sources:
            metadata = zipfile.ZipInfo(source.name, date_time=(2026, 1, 1, 0, 0, 0))
            metadata.compress_type = zipfile.ZIP_DEFLATED
            metadata.external_attr = 0o644 << 16
            archive.writestr(metadata, source.read_bytes())
    print("Created ross-sections-21-38-latex.zip")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check-only", action="store_true", help="Check exercise coverage only")
    parser.add_argument("--section", type=int, choices=range(21, 39),
                        help="Compile one section only; do not refresh the full source archive")
    parser.add_argument("--jobs", type=int, default=2, help="Concurrent TeX builds (default: 2)")
    args = parser.parse_args()
    if args.jobs < 1:
        parser.error("--jobs must be positive")
    check_coverage()
    if args.check_only:
        return
    if not shutil.which("latexmk"):
        raise RuntimeError("Install latexmk and the TeX Live packages listed in README.md.")
    targets = ([f"ross-section-{args.section}"] if args.section else
               [f"ross-section-{s['section']}" for s in SECTIONS] + VOLUMES)
    with tempfile.TemporaryDirectory(prefix="mathjock-ross-21-38-") as temporary:
        output = Path(temporary)
        with ThreadPoolExecutor(max_workers=args.jobs) as pool:
            list(pool.map(lambda target: compile_pdf(target, output), targets))
        # Publish outputs only after every selected target passes.
        for target in targets:
            shutil.copyfile(output / (target + ".pdf"), ROOT / (target + ".pdf"))
    if args.section is None:
        archive_sources()


if __name__ == "__main__":
    main()
