# Ross: Complete Chapter 1

Detailed, independently written solutions to every exercise and subpart in
Kenneth A. Ross, *Elementary Analysis: The Theory of Calculus*, second edition
(Springer, 2013). Numbering was checked against the textbook PDF already in this
repository.

- Section 1: Exercises 1.1–1.12.
- Section 2: Exercises 2.1–2.8.
- Section 3: Exercises 3.1–3.8.
- Section 4: Exercises 4.1–4.16, including all 23 sets in each of 4.1–4.4.
- Section 5: Exercises 5.1–5.7.
- Section 6: Exercises 6.1–6.5, including the construction using Dedekind cuts.

This covers all 56 exercises and every subpart in Chapter 1.

Each solution explains the goal, assumptions, intermediate algebra, and logical
steps. Exercise 1.9 distinguishes the literal integer domain (which includes
zero) from the positive-integer convention.

## Read

Open `ross-chapter-1.pdf` for the complete chapter, or the individual
`ross-section-01.pdf` through `ross-section-06.pdf` files. The website links to
these compiled PDFs. Earlier published files are retained for existing
bookmarks. The original textbook remains unchanged at the repository root.

## Build from LaTeX

Requirements: Python 3, a TeX installation with pdfLaTeX and latexmk, and the
packages imported in `preamble.tex` (all are standard TeX Live packages).

From this directory:

```sh
python3 build.py
```

The script compiles the six individual PDFs, the complete chapter PDF, and
the earlier combined document using latexmk, checks the logs and exercise
coverage, and refreshes `ross-chapter-1-latex.zip`. Auxiliary files are kept
in a temporary build directory, outside the checkout.

The source archive includes all `.tex` files, this README, and `build.py`.
Extract it into one directory and run the same command. You can also compile
one document directly from this directory:

```sh
latexmk -pdf -interaction=nonstopmode -halt-on-error ross-section-01.tex
```

`section-XX-solutions.tex` files contain the mathematical content (Section 4
imports separate bounds and proof files);
`ross-section-XX.tex` files provide standalone document wrappers;
`preamble.tex` supplies the shared layout and notation. No external assets or
network requests are needed to build the documents.
