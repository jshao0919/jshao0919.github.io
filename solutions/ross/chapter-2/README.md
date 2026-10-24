# Ross: Chapter 2, Sections 7–8

Detailed, independently written solutions to every exercise and subpart in
Sections 7 and 8 of Kenneth A. Ross, *Elementary Analysis: The Theory of
Calculus*, second edition (Springer, 2013).

- Section 7: Exercises 7.1–7.5, including all 20 parts of Exercise 7.3.
- Section 8: Exercises 8.1–8.10, including every lettered subpart.

This covers 15 exercises from the opening two sections of Chapter 2. Section 7
includes explicit calculations and reasoning even where the textbook asks only
for answers. Section 8 uses direct epsilon–N proofs: every estimate states its
conditions, explains the choice of threshold, and checks the final inequality.
The limit laws introduced in Section 9 are not assumed.

## Read

Open `ross-chapter-2-sections-7-8.pdf` for both sections, or the individual
`ross-section-07.pdf` and `ross-section-08.pdf` files. The Ross page on the
website links to all three PDFs and the source archive.

## Build from LaTeX

Requirements: Python 3, pdfLaTeX, latexmk, and the standard TeX Live packages
imported in `preamble.tex`. From this directory:

```sh
python3 build.py
```

The script checks exercise coverage, compiles all three documents, checks the
final logs, and writes `ross-chapter-2-latex.zip`. Auxiliary files stay in a
temporary directory outside the checkout.

To rebuild from the source archive, extract all its files into one directory
and run the same command. No other repository files, external assets, or
network requests are needed. To build only one section directly:

```sh
latexmk -pdf -interaction=nonstopmode -halt-on-error ross-section-07.tex
```

The `section-XX-solutions.tex` files assemble the content fragments in exercise
order. The `ross-section-XX.tex` files are standalone wrappers. The combined
wrapper is `ross-chapter-2-sections-7-8.tex`; `preamble.tex` contains the common
layout and notation. The archive includes all LaTeX files, this README, and
`build.py`.
