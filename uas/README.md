# UAS Recognition & Sensor Literacy

A static, interactive public-information course at [uas/](./index.html). It
runs on GitHub Pages without a backend, account, external libraries, fonts,
tracking, or runtime network requests beyond its own files.

The course includes ten beginner lessons, 32 family/naming entries, two science
labs, 44 explained assessment questions, a fictional observation-writing
exercise, a glossary, and a complete [printable workbook](workbook.html).
Suggested lesson study and reflection total approximately 145 minutes; allow
three to four hours for the course with labs, atlas exploration, and assessment.
These are pacing suggestions, not timed requirements.

## Scope and source quality

This is a broad educational survey, **not an exhaustive or current inventory**
of Iranian aircraft. Historical families, reported variants, ambiguous names,
and regional associations are distinguished. A matching shape does not establish
origin, operator, intent, or exact variant. Icons depict generic configurations;
they are not photographs or dimensionally accurate identification plates.

The counter-UAS material covers general safety, observation, reporting,
coordination, uncertainty, and authorized responsibilities. It supplies no weapon
selection, engagement ranges, firing rules, site-specific tactics, or military
installation capabilities. The network is fictional and does not describe
equipment, coverage, topology, or readiness at Camp Arifjan. U.S. agency reading
material is educational context and does not establish authority in Kuwait.

External reference sites returned proxy errors during preparation. The source
ledger therefore contains explicitly qualified **background reading and discovery
leads**, not a newly verified claim-by-claim bibliography. In particular, search
links are not evidence for catalogue claims, and historical reports cannot
establish recent variants or current inventories. Every entry retains its
evidence note. The course and workbook expose this limitation visibly. Before
formal instruction, a qualified instructor should check dated original material,
image provenance, and the applicable approved local procedures.

No source audit date is fabricated. This edition makes no 2026 completeness claim.
The mathematical examples are original, reproducible teaching models. A passing
self-study score is not an operational qualification.

## Course organization

1. UAS fundamentals, names, variants, and aliases.
2. Observable features, perspective, and calibrated uncertainty.
3. Iranian family names and public-reference limitations.
4. Detection, tracking, classification, identification, and intent.
5. CA-CFAR: derivation, worked example, assumptions, and failure of assumptions.
6. Complementary sensor types, association, provenance, and conditional dependence.
7. Observation and reporting procedures; official protective instructions.
8. Counter-UAS governance, coordination, and authorized response principles.
9. Debris and explosive-hazard awareness.
10. A fictional capstone integrating observation, model limits, and reporting.

The atlas supports search, category/reference-status filters, entry details, and
two-entry comparison. Lessons can be marked complete and resumed. Practice is
available by lesson or as a full assessment, with explanations after every answer
and links to revisit missed ideas. The self-study review target is 80%.

## Models and data handling

The CFAR lab uses dimensionless synthetic exponential power samples and
`alpha = N * (Pfa ** (-1 / N) - 1)`, where `N` is the total reference-cell count.
The controls specify reference and guard cells **per side**. Edge cells with
incomplete windows receive no decision. The plot, selected-cell calculation,
and text summary share the same calculation. Values are not operational radar
settings, distances, or performance estimates.

The Bayesian lab uses invented likelihood ratios for a manufactured test-object
hypothesis. Multiplication assumes conditional independence under both hypotheses.
When independence is not assumed, the lab declines to calculate a combined
posterior; correlated evidence needs an appropriate joint model.

Only lesson completion and the last full-assessment score are stored under
`mathjock.uas.progress.v1` in this browser. Storage errors produce a visible
message; the course remains usable in memory. Reset requires confirmation and
affects only this course. No cross-device synchronization or certification is
provided. Fictional practice notes are not stored; the user may download a plain
text copy. Do not enter real incident, personal, or installation information.

## Development

Serve the repository root:

```sh
python3 -m http.server 8770 --bind 127.0.0.1
```

Open `http://127.0.0.1:8770/uas/`. ES modules need HTTP rather than `file://`.

- `lessons.js`, `quiz.js`: learning content and answer explanations.
- `catalogue.js`, `catalogue-sources.json`: family entries and qualified reading leads.
- `sources.js`: shared technical reading leads and glossary.
- `lab-core.js`: independently testable mathematical models.
- `app.js`, `index.html`, `course.css`: interactive and accessible presentation.
- `build.mjs`: validation and deterministic source-module/workbook generation.

After changing course data, run:

```sh
node uas/build.mjs
node uas/build.mjs --check
node --test tests/uas-lab.test.mjs
python3 tests/uas-browser.py
```

The browser check needs Python Playwright and Chromium. Install test tooling
outside the repository if it is not available. The generated workbook contains
the full course, atlas, exercises, answer key, glossary, and references; it can be
read without JavaScript or printed through the browser.

### Verification of this edition

- Nine mathematical tests pass, including independent reference-window
  calculations and 50,000 noise-only Monte Carlo trials of the CFAR model.
- 134 browser checks pass: all 44 assessment answers and explanations, wrong-answer
  review, navigation, progress persistence, corrupt/blocked storage, reset isolation,
  atlas search/comparison/dialogs, both labs, practice-note download, keyboard
  access, source jumps, and desktop/390 px/320 px layouts.
- The deterministic build validates schemas, IDs, source references, and generated
  freshness. The JavaScript-free workbook contains all ten lessons, 32 entries,
  44 questions, and 44 answer explanations. Its 137 IDs are unique and all internal
  fragments resolve. A 78-page A4 print was checked for clipping and text bounds.
- Content and mathematical reviews were performed independently of the authors.
  These checks validate implementation and internal consistency; they do not
  replace the external source audit described above.

## Maintenance

Preserve uncertainty qualifiers when editing descriptions. Add a new variant only
with a clearly scoped entry and dated, attributable supporting material. A new
announcement is not evidence of inventory, readiness, or advertised performance.
Do not silently convert a secondary search lead into a verified citation. Keep
fictional numerical experiments separate from claims about deployed sensors.
Rebuild the workbook and run the checks after content or interaction changes.
