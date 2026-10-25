# Verification of the Lay collection

This release covers 65 printed exercise groups: 1,920 numbered exercises
and 115 practice problems, including every subpart. The complete PDF has
**815 pages**. The separately published online Chapters 9–10
are absent from the supplied source and remain outside this release.

## Mathematical and source review

Every exercise group received independent manuscript review by a separate
author. The review covered arguments, calculations, subparts, source
transcription, and required diagrams. Reported issues were corrected and
rechecked before this build.

Exact and numerical checks included row-reduction identities, full
parametrizations and their dimensions, determinants and inverses, eigenpairs,
orthogonal diagonalizations, SVD reconstruction, Gram–Schmidt/QR factors,
projection and least-squares residuals, Markov and power iterations,
Fourier integrals, weighted fits, affine coordinates, and spline joining
conditions. Source matrices and diagrams were read from rendered PDF pages
when text extraction garbled their signs or layout.

Computer checks used SymPy 1.14.0 and NumPy 2.3.5 in the prepared environment.
Machine-specific timing results are identified as observations. Conditional
legacy commands use the explicitly stated treatment in `SOURCE_NOTES.md`.

## Build and navigation checks

- All **74 PDFs** built with pdfLaTeX/latexmk: 65 exercise-group PDFs, eight
  chapter collections, and one complete collection.
- The build rejected overfull boxes, missing characters, unresolved references,
  duplicate reference definitions, and duplicate PDF destinations.
- All 65 groups match the source inventory and exact ordered exercise/practice IDs.
- The complete PDF has **2,100 outline entries**: 65 section entries and one
  entry for each of the 2,035 numbered/practice problems. Every problem
  bookmark was checked against the actual text on its destination page.
- The source archive contains 211 files: all LaTeX inputs, metadata,
  documentation, and the build script. CRC checks and byte comparisons pass.
  An extracted archive rebuilt the full 815-page PDF with identical 2,100-entry
  navigation; the extracted Python inventory checks and Section 8.6 build pass.
- All 76 website links return HTTP 200, including 75 PDF downloads (the
  textbook and 74 solution PDFs) and the source ZIP. Download signatures pass.
- Chromium checks at desktop and mobile sizes confirm 75 table rows, all
  65 printed-group download links, 10 explicit source-needed online rows,
  correct heading order, working horizontal table scroll, and no page overflow.
  Screenshots of the top and collections area were visually inspected.

## Chapter PDF lengths

| Chapter | Pages |
| --- | ---: |
| 1 | 154 |
| 2 | 105 |
| 3 | 67 |
| 4 | 129 |
| 5 | 134 |
| 6 | 110 |
| 7 | 69 |
| 8 | 56 |

Heading and compilation checks establish coverage and artifact integrity;
they do not constitute formal proof verification. Mathematical review and
independent calculations are separate from those mechanical checks.
