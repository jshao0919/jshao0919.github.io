# Ross: Chapter 3, Sections 17–20

Detailed, independently written solutions to every exercise and subpart in
Sections 17–20 of Kenneth A. Ross, *Elementary Analysis: The Theory of
Calculus*, second edition (Springer, 2013).

- Section 17: Exercises 17.1–17.16, including every lettered subpart.
- Section 18: Exercises 18.1–18.12, including every lettered subpart.
- Section 19: Exercises 19.1–19.12, including every lettered subpart.
- Section 20: Exercises 20.1–20.20, including every lettered subpart and the requested graph sketches.

These 60 exercises cover the first four sections of Chapter 3. Sections 21–22
are not included. Chapter 1 and Chapter 2 solutions have their own directories
and source archives.

Section 17 checks domains and continuity, gives direct epsilon–delta proofs,
and treats dense rational and irrational sets. Section 18 develops extreme
values, intermediate values, and monotone inverse functions. Section 19 makes
the quantifiers of uniform continuity explicit and explains the global
estimates and counterexamples. Section 20 includes original vector sketches,
proofs of finite and infinite limits, and careful treatment of indeterminate
forms. Each solution states the hypotheses being used and explains the
intermediate algebra and logical steps.

## Read

Open `ross-chapter-3-sections-17-20.pdf` for the collection, or an individual
`ross-section-17.pdf` through `ross-section-20.pdf`. The Ross page links to the
combined PDF, individual section PDFs, and `ross-chapter-3-latex.zip`.

## Build from LaTeX

Requirements: Python 3, pdfLaTeX, latexmk, and the standard TeX Live packages
imported in `preamble.tex`. From this directory:

```sh
python3 build.py
```

The script checks exercise coverage and order, compiles all five documents,
checks the final logs for layout and reference problems, and writes
`ross-chapter-3-latex.zip`. Auxiliary files stay in a temporary directory
outside the checkout.

To rebuild from the source archive, extract all files into one directory and
run the same command. The archive contains every LaTeX file, this README, and
the build script. No other repository files, external graphics, or network
requests are needed. To build just one section directly:

```sh
latexmk -pdf -interaction=nonstopmode -halt-on-error ross-section-17.tex
```

The `section-XX-solutions.tex` files assemble the content in exercise order;
some input additional local fragments. The `ross-section-XX.tex` files are
standalone wrappers. The combined wrapper is
`ross-chapter-3-sections-17-20.tex`; `preamble.tex` holds the common layout and
notation.
