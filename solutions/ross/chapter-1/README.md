# Ross: Chapter 1, Sections 1–3

Detailed, independently written solutions to every exercise and subpart in
Kenneth A. Ross, *Elementary Analysis: The Theory of Calculus*, second edition
(Springer, 2013). Numbering was checked against the textbook PDF already in this
repository.

- Section 1: Exercises 1.1–1.12.
- Section 2: Exercises 2.1–2.8.
- Section 3: Exercises 3.1–3.8.

Each solution explains the goal, assumptions, intermediate algebra, and logical
steps. Exercise 1.9 distinguishes the literal integer domain (which includes
zero) from the positive-integer convention.

## Read

Open `ross-chapter-1-sections-1-3.pdf` for all three sections, or the individual
`ross-section-01.pdf`, `ross-section-02.pdf`, and `ross-section-03.pdf` files.
The website links to these compiled PDFs. The original textbook remains
unchanged at the repository root.

## Build from LaTeX

Requirements: Python 3, a TeX installation with pdfLaTeX and latexmk, and the
packages imported in `preamble.tex` (all are standard TeX Live packages).

From this directory:

```sh
python3 build.py
```

The script compiles the three individual PDFs and the combined PDF using
latexmk, checks the logs, and refreshes `ross-chapter-1-latex.zip`. Auxiliary
files are kept in a temporary build directory, outside the checkout.

The source archive includes all `.tex` files, this README, and `build.py`.
Extract it into one directory and run the same command. You can also compile
one document directly from this directory:

```sh
latexmk -pdf -interaction=nonstopmode -halt-on-error ross-section-01.tex
```

`section-XX-solutions.tex` files contain the mathematical content;
`ross-section-XX.tex` files provide standalone document wrappers;
`preamble.tex` supplies the shared layout and notation. No external assets or
network requests are needed to build the documents.
