# jshao0919.github.io
Revisiting math :)

## Ross solutions

[Complete Chapter 1](solutions/ross/chapter-1/ross-chapter-1.pdf) contains
detailed LaTeX solutions to all 56 exercises and every subpart across Sections
1–6 of the second edition of Kenneth A. Ross's *Elementary Analysis*, including
the development of the real numbers using Dedekind cuts. The website links to
the complete chapter PDF, individual section PDFs, and a LaTeX source archive.
See [the Chapter 1 source and build instructions](solutions/ross/chapter-1/README.md).

[Complete Chapter 2](solutions/ross/chapter-2/ross-chapter-2.pdf)
covers all 117 exercises in Sections 7–16, including explicit calculations,
finite and infinite limits, epsilon–N proofs, recursive sequences, monotonicity,
Cauchy arguments, subsequences, lim sup/lim inf proofs, metric-space topology,
series and convergence tests, and decimal expansions.
Individual section PDFs and a LaTeX source archive are
linked on the website. See
[the Chapter 2 source and build instructions](solutions/ross/chapter-2/README.md).

## Arithmetic Lab

The homepage links to [Arithmetic Lab](arithmetic/), a Zetamac-inspired mental math
trainer. It runs entirely on GitHub Pages with no build, backend, account, or
external dependencies.

- Choose addition, subtraction, multiplication, and division; customize operand
  ranges and rounds from 15 seconds to 10 minutes.
- Correct answers advance immediately. Enter checks an answer; Escape ends a
  round early. Only incorrect Enter submissions count as wrong checks.
- Finished rounds automatically save scores and individual problem timings in
  this browser's local storage. Progress is also saved during play; reloading a
  running round keeps it as an early-ended round.
- Charts compare identical settings by default, with optional all-setup and date
  filters. Early-ended rounds stay in the training log and timing analysis but
  do not count toward score trends or personal bests.
- Slow-problem and operation summaries include unfinished attempts. Their times
  are lower bounds, since those problems were not solved before the round ended.
- Export/import JSON backups to retain history or move it between browsers.
  Imports merge rounds without overwriting existing IDs. There is no automatic
  cross-device sync. Clearing site data removes local history.

History supports up to 2,000 rounds and 100,000 attempts, within a 5 MB backup.
Browser storage limits may be lower. Saving failures are shown on the page;
export your history before leaving if saving is unavailable. Timers continue
while the tab is in the background, and those seconds count toward response
times. To start a fresh log, export a backup and use “Clear history”; deletion
requires confirmation.

### Local development

From the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `/arithmetic/` on that server. Serve through HTTP rather than opening the
HTML as a file, because the game uses JavaScript modules. Publish the repository
through the existing GitHub Pages workflow to make changes live.

### Checks

Node.js 18 or newer can run the dependency-free generation, statistics, and backup
validation tests:

```sh
node --test tests/arithmetic-core.test.mjs tests/arithmetic-data.test.mjs
```

The browser regression check in `tests/arithmetic-browser.mjs` uses Playwright
and Chromium with the local server running. It covers real gameplay, timing,
persistence, backups, charts, and mobile layout. Install browser tooling outside
the checkout if it is not already available:

```sh
npm install --prefix /tmp/mathjock-browser-tests playwright
/tmp/mathjock-browser-tests/node_modules/.bin/playwright install chromium
PLAYWRIGHT_MODULE=/tmp/mathjock-browser-tests/node_modules/playwright/index.mjs \
  node tests/arithmetic-browser.mjs
```

Set `BASE_URL` to use a different local server, or `CHROMIUM_PATH` to use an
existing Chromium installation.
