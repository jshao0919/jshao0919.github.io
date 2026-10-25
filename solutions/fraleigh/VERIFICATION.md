# Verification record

## Source inventory

The supplied seventh-edition scan contains 58 exercise sets: Sections 0–56
and Appendix A. The frozen source inventory records **1,646 numbered exercises**,
with every subpart included. Counts were read from the textbook, then checked
against the manuscript headings; these are separate checks.

Rendered source pages were inspected for mathematical data and diagrams.
The boundary audit explicitly checked pages following every exercise set,
including continuations printed above the next section heading. This caught
and included the continuations in Sections 1, 6, 10, 14, 37, and 53. The scan's
changing page offsets are recorded with actual PDF page numbers.

## Mathematical review

Every exercise was reviewed by someone other than its author against the
source, including all true/false items, subparts, requested diagrams, proof
directions, and theorem hypotheses. Findings were corrected and rechecked.
The independent review coverage and executable calculation checks were:

| Reviewed range | Exercises | Independent exact assertions |
| --- | ---: | ---: |
| Sections 0–7 | 322 | 2,184 |
| Sections 8–15 | 373 | 398 |
| Sections 16–25 and Appendix A | 292 | 476 |
| Sections 26–33 | 238 | 465 |
| Sections 34–44 | 176 | 249 |
| Sections 45–56 | 245 | 96 |
| **Total** | **1,646** | **3,868** |

These checks supplement proof review; assertion counts do not establish
correctness of an arbitrary proof. Checks included:

- Actual Cayley-table entries, permutation products and orders, subgroup
  enumerations, quotient maps, finite abelian classifications, Sylow counts,
  symmetric-group class equations, and group-presentation normal forms.
- Exact polynomial division and factorization, finite-field generators,
  minimal polynomials, extension degrees, primitive-element certificates,
  Gröbner-basis ideal equality and S-pairs, and monomial-lattice degrees.
- All source complex arithmetic and appendix matrices; ordered-ring
  calculations using the specified positive cones rather than an assumed
  natural order.
- Integer boundary and coboundary matrices, relative/exact-sequence maps,
  and reconstruction of the projective-plane triangulation in 43.8 with
  19 vertices, 54 edges, and 36 triangles. Its integer Smith form gives the
  stated order-two homology class.
- All field/subgroup correspondence tables and diagram inclusions, complex
  conjugation and sign-change actions, separability and characteristic
  exceptions, and the quintic sketch and real-root count.
- Burnside counts from actual signed-coordinate rotation groups. Exercise
  17.9(b) was also checked by direct enumeration of all 46,656 labeled
  prism colorings; the result is 6,426. A portable standard-library check
  is included as `verify_counting.py`.

Source discrepancies and conventions are documented in
[SOURCE_NOTES.md](SOURCE_NOTES.md), including the essential diagonal glides
in 12.39 and the incorrect printed prism count in 17.9(b).

## PDF build and navigation

All **69 PDFs** were built with pdfLaTeX/latexmk: 58 individual exercise-set
PDFs, ten part collections, and the complete collection. The build rejects
overfull boxes, missing characters, unresolved references, multiply defined
labels, and duplicate PDF destinations. TeX dependencies are flat and local;
no temporary input paths or external graphics are needed.

The complete collection has **414 pages**, **58 section bookmarks**, and
**1,646 exercise bookmarks**, for **1,704 outline entries**. Checks validate
exercise order and every destination page against the actual exercise
heading, with a delimiter after the ID so that `18.1` cannot be mistaken
for `18.10`. Section display numbers and hyperlink anchors were checked
independently, including references to Sections 0, 18, and Appendix A.

| Part collection | Pages |
| --- | ---: |
| 1 | 63 |
| 2 | 64 |
| 3 | 43 |
| 4 | 61 |
| 5 | 25 |
| 6 | 30 |
| 7 | 39 |
| 8 | 20 |
| 9 | 18 |
| 10 | 48 |

Required figures and representative tables were visually inspected, including
Cayley digraphs, finite-field tables, the projective-plane construction,
long exact sequences, field lattices, and the quintic graph.

## Portable archive and website

The source archive is checked for CRC errors, duplicate/unsafe names, exact
expected membership, and byte-for-byte agreement with the current sources.
An independent clean extraction is rebuilt with `python3 build.py`, which
validates the inventory and reconstructs all 69 PDFs. Outline entries and
page text are compared with the published artifacts. The extracted
`verify_counting.py` is also run.

Local HTTP checks follow every one of the website's 73 links, including all
69 solution PDFs, the textbook, source ZIP, source notes, and homepage. PDF
and ZIP signatures are checked; the downloaded archive must match the actual
archive bytes. Chromium checks at desktop 1440×1000 and mobile 390×844 verify
58 completed rows, the first heading “Solutions by section,” horizontal
scrolling within the table, no outer page overflow, and no JavaScript errors.
These local checks are distinct from confirming a remote GitHub Pages build.
