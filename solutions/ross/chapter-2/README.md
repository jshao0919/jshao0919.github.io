# Ross: Complete Chapter 2, Sections 7–16

Detailed, independently written solutions to every exercise and subpart in
Sections 7–16 of Kenneth A. Ross, *Elementary Analysis: The Theory of
Calculus*, second edition (Springer, 2013).

- Section 7: Exercises 7.1–7.5, including all 20 parts of Exercise 7.3.
- Section 8: Exercises 8.1–8.10, including every lettered subpart.
- Section 9: Exercises 9.1–9.18, including every lettered subpart.
- Section 10: Exercises 10.1–10.12, including every lettered subpart.
- Section 11: Exercises 11.1–11.11, including every lettered subpart and the figure-based sequence.
- Section 12: Exercises 12.1–12.14, including every lettered subpart.
- Section 13: Exercises 13.1–13.15, including every lettered subpart and all assertions requested from the text.
- Section 14: Exercises 14.1–14.14, including every lettered subpart.
- Section 15: Exercises 15.1–15.8, including every lettered subpart.
- Section 16: Exercises 16.1–16.10, including every lettered subpart.

This completes all 117 exercises in Chapter 2, including the enrichment
sections on metric spaces and decimal expansions. Section 7
includes explicit calculations and reasoning even where the textbook asks only
for answers. Section 8 uses direct epsilon–N proofs: every estimate states its
conditions, explains the choice of threshold, and checks the final inequality.
Sections 7–8 do not assume the limit laws introduced in Section 9. Section 9
checks each limit law's hypotheses and distinguishes finite convergence from
infinite limits. Section 10 gives detailed monotonicity, completeness, and
Cauchy arguments, including counterexamples and recursive constructions.
Section 11 constructs subsequences and proves that lists of subsequential
limits are exhaustive. Section 12 develops lim sup/lim inf laws, comparisons,
averages, and factorial-root limits with explicit finite and infinite cases.
Section 13 develops metrics, interiors, closures, and compactness with proofs
from definitions. Sections 14–15 check the hypotheses of each convergence
test and explain the estimates and integral calculations. Section 16 covers
decimal ambiguity, repeating blocks, long division, diagonalization, and
irrationality; any use of a stronger result stated in the text is identified.

## Read

Open `ross-chapter-2.pdf` for the complete chapter, or the individual
`ross-section-07.pdf` through `ross-section-16.pdf` files. The new addition
is also collected in `ross-chapter-2-sections-13-16.pdf`. Earlier
published files are retained for existing bookmarks. The Ross page links to
the expanded collection, individual section PDFs, and the updated source
archive.

## Build from LaTeX

Requirements: Python 3, pdfLaTeX, latexmk, and the standard TeX Live packages
imported in `preamble.tex`. From this directory:

```sh
python3 build.py
```

The script checks exercise coverage, compiles all seventeen documents, checks the
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
wrapper is `ross-chapter-2.tex`; `preamble.tex` contains the common
layout and notation. The archive includes all LaTeX files, this README, and
`build.py`.
