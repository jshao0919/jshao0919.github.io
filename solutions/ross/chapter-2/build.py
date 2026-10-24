#!/usr/bin/env python3
"""Build the Ross PDFs and a complete, portable LaTeX source archive."""
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import zipfile

ROOT = Path(__file__).resolve().parent
TARGETS = ["ross-section-07", "ross-section-08", "ross-chapter-2-sections-7-8"]
EXPECTED = {7: 5, 8: 10}


def expanded_source(path, ancestors=()):
    """Read split section files in the same order as their LaTeX inputs."""
    path = path.resolve()
    if path.parent != ROOT or path in ancestors:
        raise SystemExit(f"Invalid or circular section input: {path.name}")

    def include(match):
        name = match.group(1)
        if not name.endswith(".tex"):
            name += ".tex"
        return expanded_source(ROOT / name, ancestors + (path,))

    return re.sub(r"\\input\{([^}]+)\}", include, path.read_text())


def main():
    if not shutil.which("latexmk"):
        raise SystemExit("latexmk is required; install a TeX distribution first.")
    for section, count in EXPECTED.items():
        source = ROOT / f"section-{section:02}-solutions.tex"
        exercises = re.findall(r"\\exercise\{(\d+\.\d+)\}", expanded_source(source))
        expected = [f"{section}.{i}" for i in range(1, count + 1)]
        if exercises != expected:
            raise SystemExit(f"{source.name}: expected exercises {expected}, got {exercises}")
    with tempfile.TemporaryDirectory(prefix="mathjock-ross-build-") as temporary:
        output = Path(temporary)
        for target in TARGETS:
            result = subprocess.run(
                ["latexmk", "-pdf", "-interaction=nonstopmode", "-halt-on-error",
                 "-file-line-error", f"-outdir={output}", f"{target}.tex"],
                cwd=ROOT, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
            if result.returncode:
                print(result.stdout)
                raise SystemExit(f"Build failed for {target}.tex")
            log = (output / f"{target}.log").read_text(errors="replace")
            problems = [line for line in log.splitlines()
                        if "Overfull" in line or "undefined references" in line
                        or "multiply defined" in line or "Missing character" in line]
            if problems:
                raise SystemExit(f"{target}: review layout/reference warnings:\n" + "\n".join(problems))
            pdf = output / f"{target}.pdf"
            if not pdf.is_file() or not pdf.read_bytes().startswith(b"%PDF-"):
                raise SystemExit(f"{target}: expected a valid PDF.")
            print(f"Compiled {target}.pdf ({pdf.stat().st_size:,} bytes)")
        for target in TARGETS:
            shutil.copyfile(output / f"{target}.pdf", ROOT / f"{target}.pdf")
    source_files = sorted(ROOT.glob("*.tex")) + [ROOT / "README.md", ROOT / "build.py"]
    with zipfile.ZipFile(ROOT / "ross-chapter-2-latex.zip", "w", zipfile.ZIP_DEFLATED) as archive:
        for path in source_files:
            # Stable archive metadata makes repeated builds easy to compare.
            metadata = zipfile.ZipInfo(path.name, date_time=(2026, 1, 1, 0, 0, 0))
            metadata.compress_type = zipfile.ZIP_DEFLATED
            metadata.external_attr = 0o644 << 16
            archive.writestr(metadata, path.read_bytes())
    print("Created ross-chapter-2-latex.zip")


if __name__ == "__main__":
    main()
