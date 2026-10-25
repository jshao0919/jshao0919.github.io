# Lay: Linear Algebra and Its Applications

Original step-by-step worked solutions for David C. Lay, *Linear Algebra and
Its Applications*, fourth edition (Pearson, 2012), following the actual
textbook provided as `Lay01.pdf` in this repository.

The printed collection contains **1,920 numbered exercises and 115 practice
problems**, including every subpart across 58 sections and seven supplementary
sets. See the [chapter and section coverage](COVERAGE.md). Coverage is recorded per
group in `section-*.json`; an unprovided source is never marked complete.
The table of contents lists online Chapters 9–10, but their text and exercises
are absent from this PDF. Their exact source is required before those groups
can be authored or claimed as completed.

For a beginning undergraduate reader, the solutions explain definitions,
intermediate row operations, calculations, proof strategies, hypotheses of
theorems, and interpretations of answers. Problem descriptions are brief;
consult the textbook for the original questions. These are independent
solutions, not a publisher's solutions manual.

## Numbering

`1.2.3` means Exercise 3 in Section 1.2. `1.2.P1` is the first practice problem
in that section. `1.S.3` is Chapter 1 supplementary Exercise 3. Each metadata
file gives the exact exercise/practice count and the source PDF page numbers
(not printed page numbers). The main-body PDF offset is +17 pages, but source
headers and rendered exercise pages are the authority when locating material.

## Read

- [Complete printed Chapters 1–8 (PDF)](lay-complete.pdf): 815 pages.
- [Portable LaTeX sources (.zip)](lay-latex.zip).
- Individual section and supplementary PDFs are linked in [COVERAGE.md](COVERAGE.md).
- [Verification record](VERIFICATION.md) and [source notes](SOURCE_NOTES.md).

## Rebuild

Requirements: Python 3, pdfLaTeX, latexmk, Latin Modern, and the packages in
`preamble.tex`. Typical TeX Live packages are `texlive-latex-base`,
`texlive-latex-recommended`, `texlive-latex-extra`,
`texlive-fonts-recommended`, and `lmodern`.

From this directory, or from an extracted `lay-latex.zip`:

```sh
python3 build.py --check-only
python3 build.py
```

The first command verifies exercise and practice headings against the
metadata. Both commands require metadata for every printed exercise group.
The second compiles the groups, chapter collections,
and complete collection, then creates a portable source archive. Heading
checks do not verify the mathematical content or the completeness of the
source inventory. Mathematical review and calculation checks are separate.
The build rejects overfull boxes, missing characters, unresolved references,
and duplicate PDF destinations. TeX auxiliary files remain outside the checkout in temporary
directories. Two TeX builds run concurrently by default.

To refresh a single group:

```sh
python3 build.py --group 1.2
```

Run the full build after edits to refresh the chapter collections and archive.

## Source fidelity and verification

The provided PDF has unusual font encodings, so ordinary text extraction
garbles prose and some mathematical symbols. Authors inspect rendered
exercise pages when reading matrices, figures, and signs. Numerical results
are checked using exact arithmetic when appropriate. No matrix or problem
is invented to replace unreadable data; missing datasets and online sources
are recorded explicitly.

See [source notes and mathematical qualifications](SOURCE_NOTES.md) for
identified inconsistencies and the conventions used in the solutions.
