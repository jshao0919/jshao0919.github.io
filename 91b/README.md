# Motor Pool · 91B Learning Lab

A self-paced course on common wheeled-vehicle PMCS and maintenance documentation.
Open [the course](index.html) or [the complete reading and print edition](workbook.html).
The homepage links to `/91b/`.

## Learning material

- 14 detailed beginner lessons, each with objectives, worked examples, takeaways,
  and three explained knowledge checks (42 questions total).
- 12 generic inspection stations covering preparation, exterior, tires, engine,
  cooling, electrical, cab, chassis, during-operation observations, and closeout.
- Original SVG truck and leak-class animations with play, pause, and manual steps.
- Eight DA Form 2404 and DA Form 5988-E field-role exercises with guided entries,
  editable practice, feedback, and clearly labeled training-record downloads.
- Guides to DA Form 5987-E / DD Form 1970 and DA Form 2408-14, status symbols,
  a maintenance handoff sequence, and a searchable glossary.
- Individual static pages for every lesson and a complete no-JavaScript workbook.

This is PMCS and paperwork foundation training, not full MOS qualification,
vehicle-specific maintenance instructions, official forms, or operation authority.
Vehicle limits, specifications, intervals, access procedures, serviceability,
status decisions, and personnel authority come from current applicable technical
manuals and unit procedures. Examples deliberately use fictional training cards
rather than invented real TM item numbers. The form layouts teach field roles;
they do not claim to reproduce a verified current official form edition.

Official publication portals are linked in `references.js`. The execution
network blocked live access to Army sources during authoring. Current publication
status, editions, form layouts, and GCSS-Army procedures were not independently
verified; the course labels this limitation on the reference page and workbook.
No remote images, analytics, fonts, or runtime dependencies are loaded.

## Local use and build

From the repository root:

```sh
npm ci --prefix 91b --cache /tmp/mathjock-91b-npm-cache --no-audit --no-fund
node 91b/build.mjs
python3 -m http.server 8770 --bind 127.0.0.1
```

Open `http://127.0.0.1:8770/91b/`. Node 18+ and pinned esbuild are build tools only.
GitHub Pages serves the committed static HTML, CSS, SVG, and bundled JavaScript.
The deterministic build validates content relationships and example entries,
creates individual lesson pages and the workbook, and emits a self-contained
content-hashed bundle. Stylesheet URLs include a content hash. Keep previously
published hashed assets available for cached HTML; unpublished intermediate
build artifacts can be removed before committing.

Edit `curriculum.js`, `inspections.js`, `forms.js`, `references.js`, `visuals.js`,
`app.js`, or `course.css`, then rebuild. Do not edit generated lesson/workbook pages.

```sh
node 91b/build.mjs --check
node --test tests/91b-core.test.mjs tests/91b-forms.test.mjs
python3 tests/91b-browser.py
```

Browser checks use Python Playwright and `/usr/bin/chromium`, installed outside
the repository. Set `BASE_URL`, `CHROMIUM_PATH`, or `SCREENSHOT_DIR` to override.
They verify UI behavior locally and do not validate official publication contents.

## Privacy and accessibility

Lesson/station completion and best full-course quiz percentage are saved locally
under `mathjock.91b.progress.v1`. Form entries stay in memory in the current tab,
except when the learner explicitly downloads a training JSON file. The application
makes no external requests. Learners should use fictional practice data only.
Clearing site data removes progress; the course remains usable if storage fails.

Animations start paused, support manual controls, stop on navigation or page hide,
and honor reduced-motion settings. Every exercise works through standard buttons,
inputs, and links without dragging. The workbook and individual reading pages
work without JavaScript and support browser printing.
