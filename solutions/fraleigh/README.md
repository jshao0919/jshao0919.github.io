# Fraleigh: A First Course in Abstract Algebra

Original step-by-step solutions following John B. Fraleigh, *A First Course in
Abstract Algebra*, seventh edition (2003), using `Fraleigh.pdf` in this repository.

The collection covers **all 1,646 numbered exercises and every subpart** in
Sections **0–56** and the **14 exercises in Appendix A**. All ten parts are included,
including optional topics, Gröbner bases, homology, inseparability, and Galois theory.
The matrix appendix is an exercise set, not just reference material.

- [Complete 414-page PDF](fraleigh-complete.pdf).
- [Portable LaTeX sources](fraleigh-latex.zip).
- [Section and part coverage, counts, and links](COVERAGE.md).
- [Source conventions and qualifications](SOURCE_NOTES.md).
- [Verification record](VERIFICATION.md).

## Organization

A label `12.3` means Exercise 3 in Section 12, and `A.3` means Exercise 3 in
the matrix appendix. Each numbered exercise has its own heading and PDF
bookmark. Short original descriptions identify the exercises; consult the
textbook for the original statements. These are independent solutions,
not a publisher's solutions manual.

Solutions explain definitions, proof strategies, intermediate calculations,
well-definedness, theorem hypotheses, and counterexamples for false statements.
They include the tables, diagrams, and subparts requested by the source.

## Source

The supplied PDF is a 520-page scan with no searchable text layer. Its metadata
identifies the seventh edition (2003); its contents list Sections 0–56. The
SHA-256 of the unmodified source is
`79f9befce67b73d97426f9ec7763fcb4bd11c23f5d6420bd42778f3a2d9bc158`.
OCR supports navigation, but rendered exercise pages are checked for signs,
exponents, matrices, and figures. Scanned pages omit blank leaves, so there is
no constant printed-to-PDF offset. The actual PDF pages for each exercise set
are recorded in `inventory.json` and `section-*.json`. Some sets continue on
the page where the next section begins; the inventory includes those continuations.

## Rebuild

Requirements: Python 3, pdfLaTeX, latexmk, Latin Modern, and the packages in
`preamble.tex`. A typical TeX Live installation uses `texlive-latex-base`,
`texlive-latex-recommended`, `texlive-latex-extra`,
`texlive-fonts-recommended`, and `lmodern`.

From this directory, or from the extracted source archive:

```sh
python3 build.py --check-only
python3 build.py
```

The first command validates all 58 exercise sets and their heading sequences
against the source inventory. It checks numbering, not mathematical correctness.
The second builds 58 section/appendix PDFs, ten part collections, and the complete
collection, then packages all portable sources in `fraleigh-latex.zip`.
Two TeX builds run concurrently by default; adjust with `--jobs`.

To rebuild one section:

```sh
python3 build.py --section 12
python3 build.py --section A
```

Run the full build after edits to update collections and the source archive.
The build rejects overfull boxes, missing characters, unresolved references,
and duplicate destinations. Auxiliary files stay in temporary directories;
PDFs are copied into the collection only after the selected builds pass.

For a portable independent check of the counting exercises and the corrected
prism answer, run `python3 verify_counting.py` (Python standard library only).

Independent mathematical review and exact calculation checks are described in
[VERIFICATION.md](VERIFICATION.md). Source discrepancies are explained in the
solutions and [SOURCE_NOTES.md](SOURCE_NOTES.md).
