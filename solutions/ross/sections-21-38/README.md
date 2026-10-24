# Ross: Sections 21–38

Original worked solutions to all **214 exercises and their subparts** in
Sections 21–38 of Kenneth A. Ross, *Elementary Analysis: The Theory of
Calculus*, second edition (Springer, 2013). These continue the existing
Sections 1–20 collection.

The intended reader is an undergraduate beginning proof-based analysis.
Each section introduces the relevant definitions, and the solutions explain
the goal, proof strategy, intermediate computations, and hypotheses of the
theorems used. Short descriptions identify the exercises; consult the linked
textbook for their original statements. These are independent solutions,
not a publisher's solutions manual.

## Read

- `ross-sections-21-38.pdf`: the complete continuation.
- `ross-section-21.pdf` through `ross-section-38.pdf`: individual sections.
- `ross-chapter-3-sections-21-22.pdf`: metric-space continuity and connectedness.
- `ross-chapter-4-sections-23-27.pdf`: series of functions and approximation.
- `ross-chapter-5-sections-28-31.pdf`: derivatives, mean values, and Taylor theory.
- `ross-chapter-6-sections-32-36.pdf`: integration, including Stieltjes and improper integrals.
- `ross-chapter-7-sections-37-38.pdf`: logarithms and nowhere-differentiable functions.
- `ross-sections-21-38-latex.zip`: all source files and this build system.

`sections.json` records the exact exercise counts. A theorem number is not an
exercise number: for example, Section 35 has 12 exercises, not 32.

## Build

Requirements: Python 3, `latexmk`, pdfLaTeX, Latin Modern fonts, and the TeX
packages imported in `preamble.tex`. A typical TeX Live installation uses
`texlive-latex-base`, `texlive-latex-recommended`, `texlive-latex-extra`,
`texlive-fonts-recommended`, and `lmodern`.

From this directory, or from an extracted source archive:

```sh
python3 build.py
```

The script checks that all 214 exercise headings occur once in order, builds
18 section PDFs, five chapter-group PDFs, and one complete PDF, rejects
overfull boxes and unresolved references, then updates the portable source
archive. Heading checks do not substitute for mathematical review. All TeX
auxiliary files stay in a temporary directory outside the checkout. Two builds
run concurrently by default; use `--jobs 1` on a memory-constrained machine.

```sh
python3 build.py --check-only
python3 build.py --section 24
```

The second command refreshes only that section's PDF. Run the complete build
after editing to refresh the combined PDFs and source archive too. For a
manual one-document build, keep auxiliary files outside the checkout:

```sh
latexmk -pdf -interaction=nonstopmode -halt-on-error \
  -outdir=/tmp/ross-section-build ross-section-24.tex
```

## Reading source corrections

The solutions distinguish the printed question from any necessary
interpretation. In particular, Exercise 22.13 mixes scalar and vector notation
that requires an explicit interpretation, and Exercise 35.12 asks for a summable infinite sequence of positive
integers, which is impossible. Their solutions explain the intended versions.
The pointwise-topology remark after Exercise 22.12 needs a qualification for
finite or countable domains. Exercise 30.3(a) is evaluated from its printed
formula rather than an inconsistent selected answer. The exponential identity
in Exercise 26.4 requires its constant term (index zero). Exercise 36.14(d)
requires the positive-weight locations to be dense for strict increase; merely
nonnegative weights do not ensure this. Exercise 36.15(b) is proved without
assuming that uniformly convergent functions must be globally bounded.

Ross's Section 35 uses a modified Riemann–Stieltjes definition that accounts
for jumps explicitly. Read the section's conventions before substituting a
different textbook's definition, especially for discontinuous integrands.
