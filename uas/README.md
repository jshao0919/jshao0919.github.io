# UAS Recognition & Sensor Literacy

A static, interactive public-information course at [uas/](./index.html). It
runs on GitHub Pages without a backend, account, external libraries, fonts,
or tracking. The core course uses its own files. An optional image-search feature
connects directly to Wikimedia only when the learner selects **Load source images**.

The course includes ten beginner lessons, 32 family/naming entries, two science
labs, 44 explained assessment questions, a fictional observation-writing
exercise, a glossary, and a complete [printable workbook](workbook.html). Each
atlas entry also has a model-study page with design vocabulary and individually
selectable public image searches. The first three lessons now emphasize archived
photographs, anatomy terms, and the distinction between a caption and a verified
model attribution.
Suggested lesson study and reflection total approximately 145 minutes; allow
three to four hours for the course with labs, atlas exploration, and assessment.
These are pacing suggestions, not timed requirements.

## Scope and source quality

This is a broad educational survey, **not an exhaustive or current inventory**
of Iranian aircraft. Historical families, reported variants, ambiguous names,
and regional associations are distinguished. A matching shape does not establish
origin, operator, intent, or exact variant. Icons depict generic configurations;
they are not photographs or dimensionally accurate identification plates. The
model-study pages provide historical source literacy, not diagnostic comparison
drills or operational aircraft identification training.

### Public image study

All 32 entries have explicit Wikimedia Commons searches (44 separately selectable
designations, including grouped variants). The user chooses a name and opts in to
one search. The browser requests up to six source records and eligible thumbnails
directly from Wikimedia. A query is never silently broadened or replaced with an
image of another model. Results may include photographs, diagrams, exhibits,
unrelated material, or mislabeled files; **model identity is not verified**.

The gallery keeps source descriptions, creator credit, stated dates, reported
reuse terms, and original Commons file links alongside the image. Descriptions
are plain-text excerpts; full metadata is available on the linked file page.
Images are displayed without cropping or added annotations. Missing results,
rejected metadata, failed thumbnails, and network errors have explicit states
and a direct archive-search fallback. The static workbook contains search links
and the same study vocabulary, without making external requests or embedding
unverified photographs.

External Commons access was blocked during development. The integration was
tested with clearly synthetic API fixtures; this does **not** establish live
availability or verified photographic coverage of every model. No generated or
test image is presented as an OSINT photograph. Source labels are claims to
investigate, not identification evidence certified by this course.

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

1. Read archived aircraft images: source claims, dates, attribution, and licenses.
2. Understand broad airframe anatomy and photographic perspective.
3. Study named families through historical captions and provenance.
4. Detection, tracking, classification, identification, and intent.
5. CA-CFAR: derivation, worked example, assumptions, and failure of assumptions.
6. Complementary sensor types, association, provenance, and conditional dependence.
7. Observation and reporting procedures; official protective instructions.
8. Counter-UAS governance, coordination, and authorized response principles.
9. Debris and explosive-hazard awareness.
10. A fictional capstone integrating observation, model limits, and reporting.

The atlas supports search, category/reference-status filters, entry details,
model-study pages, and two-entry text comparison. Source images are kept in the
separate source-study view. Lessons can be marked complete and resumed. Practice is
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

Only lesson completion, the last full-assessment score, and its edition marker are stored under
`mathjock.uas.progress.v1` in this browser. Storage errors produce a visible
message; the course remains usable in memory. Reset requires confirmation and
affects only this course. No cross-device synchronization or certification is
provided. Older assessment results are labeled as belonging to the earlier
edition. Fictional practice notes are not stored; the user may download a plain
text copy. Do not enter real incident, personal, or installation information.

The optional photo feature sends the selected public model-name query and normal
connection information to Wikimedia. It sends no course progress or practice
notes. API requests omit credentials and referrers; thumbnails use a no-referrer
policy. Metadata is not saved. Leaving the study page or changing the search name
cancels pending image-search requests. Returned markup is reduced to plain text and escaped;
image/file hosts and Creative Commons license links are validated. The gallery
accepts supported bitmap formats with recognized reported CC BY, CC BY-SA, CC0,
or explicit public-domain metadata. These checks do not independently verify
copyright ownership or factual accuracy.

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
- `model-study.js`, `photos.js`: source-study presentation and optional Commons API.
- `app.js`, `index.html`, `course.css`: interactive and accessible presentation.
- `build.mjs`: validation and deterministic source-module/workbook generation.

After changing course data, run:

```sh
node uas/build.mjs
node uas/build.mjs --check
node --test tests/uas-lab.test.mjs tests/uas-photos.test.mjs
python3 tests/uas-browser.py
python3 tests/uas-photos-browser.py
```

The browser check needs Python Playwright and Chromium. Install test tooling
outside the repository if it is not available. The generated workbook contains
the full course, atlas, exercises, answer key, glossary, and references; it can be
read without JavaScript or printed through the browser.

### Verification of this edition

- Nine mathematical tests pass, including independent reference-window
  calculations and 50,000 noise-only Monte Carlo trials of the CFAR model.
- Ten photo-module tests cover explicit queries, attribution, URL/license
  restrictions, metadata sanitization, and response/error handling. Another 71
  browser checks exercise the source-study pages using synthetic API and image
  fixtures, including opt-in requests, cancellation, timeout, failed thumbnails,
  mobile layout, and missing attribution. No test fixture is published as a
  real source photograph, and these tests do not verify live Commons retrieval.
- Browser checks cover all 44 assessment answers and explanations, wrong-answer
  review, navigation, progress persistence, corrupt/blocked storage, reset isolation,
  atlas search/comparison/dialogs, both labs, practice-note download, keyboard
  access, source jumps, and desktop/390 px/320 px layouts.
  Earlier-edition score labeling and retaking the revised assessment were also
  checked so an old score is not silently presented as a score on the new questions.
- The deterministic build validates schemas, IDs, source references, and generated
  freshness. The JavaScript-free workbook contains all ten lessons, 32 entries,
  44 questions, and 44 answer explanations. Its 138 IDs are unique and all internal
  fragments resolve. A 93-page A4 print was checked for clipping and text bounds.
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
