/**
 * Browser regression checks. Serve the repository with `python3 -m http.server 8000`
 * and run `node tests/arithmetic-browser.mjs` with Playwright installed externally.
 * Optional: BASE_URL, PLAYWRIGHT_MODULE, CHROMIUM_PATH, SCREENSHOT_DIR.
 */
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

async function loadPlaywright() {
  const moduleName = process.env.PLAYWRIGHT_MODULE;
  if (moduleName) return import(moduleName.startsWith('/') ? pathToFileURL(moduleName).href : moduleName);
  try { return await import('playwright'); } catch (error) {
    // Node installations using NODE_PATH can expose packages through require.
    try { return createRequire(import.meta.url)('playwright'); } catch {}
    const runtimeModule = '/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.js';
    if (existsSync(runtimeModule)) return import(pathToFileURL(runtimeModule).href);
    throw new Error('Install Playwright outside the repository and set PLAYWRIGHT_MODULE to its index.mjs or index.js path.', { cause: error });
  }
}

const { chromium } = await loadPlaywright();
const base = process.env.BASE_URL || 'http://127.0.0.1:8000';
const app = new URL('/arithmetic/', base).href;
const key = 'mathjock.arithmetic.v1';
const screenshotDirectory = process.env.SCREENSHOT_DIR || '/tmp';
const executablePath = process.env.CHROMIUM_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
const consoleErrors = [];
let completedChecks = 0;

function check(description, condition) {
  assert.ok(condition, description);
  completedChecks++;
  console.log(`✓ ${description}`);
}

async function text(page, selector) { return (await page.locator(selector).textContent()).trim(); }
async function stored(page) { return page.evaluate(storageKey => JSON.parse(localStorage.getItem(storageKey)), key); }
async function activeSession(page) {
  return page.evaluate(storageKey => {
    const checkpoint = JSON.parse(localStorage.getItem('mathjock.arithmetic.active.v1'));
    return checkpoint?.sessions?.[0] || JSON.parse(localStorage.getItem(storageKey))?.sessions.at(-1);
  }, key);
}
async function trackedPage(context) {
  const page = await context.newPage();
  page.on('pageerror', error => consoleErrors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  return page;
}
async function fixedClock(page) {
  await page.clock.install({ time: new Date('2026-10-19T12:00:00Z') });
  await page.clock.pauseAt(new Date('2026-10-19T12:00:01Z'));
}
async function configureSimpleRound(page) {
  await page.locator('#duration').fill('15');
  for (const operation of ['subtract', 'multiply', 'divide']) {
    const checkbox = page.locator(`[name="operation"][value="${operation}"]`);
    await checkbox.focus();
    if (await checkbox.isChecked()) await checkbox.press('Space');
  }
  await page.locator('summary').click();
  await page.getByLabel('Addition minimum', { exact: true }).fill('2');
  await page.getByLabel('Addition maximum', { exact: true }).fill('2');
  await page.getByLabel('Addition maximum', { exact: true }).blur();
}
async function noOverflow(page, description) {
  check(description, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
}
async function upload(page, contents, name = 'arithmetic-backup.json') {
  await page.locator('#import-history').setInputFiles({ name, mimeType: 'application/json', buffer: Buffer.from(contents) });
  await page.waitForFunction(() => document.getElementById('import-history').value === '');
}

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
  const page = await trackedPage(context);
  await fixedClock(page);
  await page.goto(base);
  check('homepage links to the arithmetic trainer', await page.locator('a[href="arithmetic/"]').count() === 1);
  await page.goto(app);
  await page.locator('#settings-form').waitFor();
  check('initial history is empty', await page.locator('#chart-empty').isVisible());
  await configureSimpleRound(page);
  await page.getByRole('button', { name: 'Start a round' }).click();
  check('starting a round focuses its labelled answer field', await page.getByLabel('Your answer', { exact: true }).evaluate(element => element === document.activeElement));
  check('selected ranges generate the expected problem', await text(page, '#problem') === '2 + 2 =');
  await page.clock.runFor(700);
  await page.getByLabel('Your answer', { exact: true }).fill('4');
  check('correct input advances without Enter', await text(page, '#live-score') === '1' && await page.locator('#answer').inputValue() === '');
  await page.clock.runFor(700);
  await page.locator('#answer').fill('999');
  check('typing an incorrect answer does not record a wrong check', (await activeSession(page)).attempts.every(attempt => attempt.wrongAnswers === 0));
  await page.locator('#answer').press('Enter');
  check('Enter records a wrong check and gives accessible feedback', await page.locator('#answer').getAttribute('aria-invalid') === 'true' && /Not quite/.test(await text(page, '#answer-feedback')));
  await page.clock.runFor(1600);
  await page.locator('#answer').fill('4');
  await page.clock.runFor(12000);
  await page.locator('#result-view').waitFor({ state: 'visible' });
  const saved = await stored(page);
  const session = saved.sessions[0];
  check('timer completes and saves the correct score automatically', session.completed && session.score === 2 && session.elapsedMs === 15000 && await text(page, '#result-score') === '2');
  check('per-problem timings retain wrong checks and unfinished work', session.attempts.length === 3 && session.attempts[0].elapsedMs === 700 && session.attempts[1].elapsedMs === 2300 && session.attempts[1].wrongAnswers === 1 && !session.attempts[2].solved && session.attempts[2].elapsedMs === 12000);
  check('slow-problem analysis includes the timed-out problem', /unfinished/.test(await text(page, '#slow-problems')) && /12\.0s/.test(await text(page, '#slow-problems')) && await text(page, '#result-accuracy') === '67%');
  const point = page.locator('#score-chart circle');
  await point.focus();
  check('chart points expose a keyboard-accessible score and date', await point.getAttribute('aria-label') !== null && /2 correct/.test(await text(page, '#chart-info')));
  await page.reload();
  check('a reload restores score history and settings', await text(page, '#round-count') === '1' && await page.locator('#duration').inputValue() === '15' && !(await page.locator('#storage-warning').isVisible()));
  await page.locator('summary').click();
  await page.getByLabel('Addition maximum', { exact: true }).fill('3');
  await page.getByLabel('Addition maximum', { exact: true }).blur();
  check('current-setup history isolates changed operand ranges', await text(page, '#round-count') === '0' && await page.locator('#chart-empty').isVisible());
  await page.locator('#profile-filter').selectOption('all');
  check('all-setup filter restores the score and explains comparisons', await text(page, '#round-count') === '1' && /durations and difficulty may differ/.test(await text(page, '#comparison-note')));
  await page.getByLabel('Addition maximum', { exact: true }).fill('2');
  await page.getByLabel('Addition maximum', { exact: true }).blur();
  await page.locator('#profile-filter').selectOption('current');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export backup' }).click();
  const download = await downloadPromise;
  const exported = await readFile(await download.path(), 'utf8');
  check('export contains the actual saved round and problem timings', JSON.parse(exported).sessions[0].attempts[1].elapsedMs === 2300);
  await mkdir(screenshotDirectory, { recursive: true });
  await page.screenshot({ path: join(screenshotDirectory, 'arithmetic-desktop.png'), fullPage: true });

  const importContext = await browser.newContext();
  const importPage = await trackedPage(importContext);
  await fixedClock(importPage);
  await importPage.goto(app);
  await upload(importPage, exported);
  check('import merges a real exported backup without changing selected difficulty', /1 round imported/.test(await text(importPage, '#backup-status')) && await importPage.locator('#duration').inputValue() === '120');
  await importPage.locator('#profile-filter').selectOption('all');
  check('imported history renders its chart', await text(importPage, '#round-count') === '1' && await importPage.locator('#score-chart circle').count() === 1);
  await upload(importPage, exported);
  check('importing the same backup does not duplicate rounds', /0 rounds imported/.test(await text(importPage, '#backup-status')) && (await stored(importPage)).sessions.length === 1);
  await importPage.reload();
  check('imported data remains valid after reload', (await stored(importPage)).sessions.length === 1 && !(await importPage.locator('#storage-warning').isVisible()));
  const datedBackup = JSON.parse(exported);
  const oldSession = structuredClone(datedBackup.sessions[0]);
  oldSession.id = 'browser-test-older-round';
  oldSession.startedAt = new Date(Date.parse('2026-10-19T12:00:00Z') - 100 * 86400000).toISOString();
  oldSession.endedAt = new Date(Date.parse(oldSession.startedAt) + oldSession.elapsedMs).toISOString();
  datedBackup.sessions = [oldSession];
  await upload(importPage, JSON.stringify(datedBackup));
  await importPage.locator('#profile-filter').selectOption('all');
  check('all-time history includes older imported sessions', await text(importPage, '#round-count') === '2');
  await importPage.locator('#date-filter').selectOption('7');
  check('date filtering excludes older sessions', await text(importPage, '#round-count') === '1');
  await upload(importPage, '{"version":1,"sessions":"invalid"}');
  check('an invalid import leaves existing history intact', /Import failed/.test(await text(importPage, '#backup-status')) && (await stored(importPage)).sessions.length === 2);
  importPage.once('dialog', dialog => dialog.dismiss());
  await importPage.getByRole('button', { name: 'Clear history' }).click();
  check('cancelling clear history preserves saved rounds', (await stored(importPage)).sessions.length === 2);
  importPage.once('dialog', dialog => dialog.accept());
  await importPage.getByRole('button', { name: 'Clear history' }).click();
  check('confirmed clear removes history and keeps selected settings', (await stored(importPage)).sessions.length === 0 && await importPage.locator('#duration').inputValue() === '120');

  await page.getByRole('button', { name: 'Start a round' }).click();
  await page.clock.runFor(1000);
  await page.locator('#answer').fill('4');
  await page.reload();
  const recovered = await stored(page);
  check('reloading an active round retains progress as an early-ended round', recovered.sessions.length === 2 && !recovered.sessions[1].completed && recovered.sessions[1].score === 1 && await text(page, '#round-count') === '1');
  await page.getByRole('button', { name: 'Start a round' }).click();
  await page.clock.runFor(500);
  await page.locator('#answer').press('Escape');
  check('Escape ends a round without adding a completed score', /ended early/i.test(await text(page, '#result-eyebrow')) && await text(page, '#round-count') === '1');

  const blockedContext = await browser.newContext({ acceptDownloads: true });
  await blockedContext.addInitScript(storageKey => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (name, value) {
      if (name === storageKey || name === 'mathjock.arithmetic.active.v1') throw new DOMException('Quota exceeded', 'QuotaExceededError');
      return original.call(this, name, value);
    };
  }, key);
  const blockedPage = await trackedPage(blockedContext);
  await fixedClock(blockedPage);
  await blockedPage.goto(app);
  await configureSimpleRound(blockedPage);
  await blockedPage.getByRole('button', { name: 'Start a round' }).click();
  await blockedPage.clock.runFor(1000);
  await blockedPage.locator('#answer').fill('4');
  await blockedPage.clock.runFor(14000);
  check('storage write failure preserves a usable in-memory round and warns', await blockedPage.locator('#storage-warning').isVisible() && /Not saved/.test(await text(blockedPage, '#saved-status')) && await text(blockedPage, '#result-score') === '1');
  const blockedDownloadPromise = blockedPage.waitForEvent('download');
  await blockedPage.getByRole('button', { name: 'Export backup' }).click();
  const blockedDownload = await blockedDownloadPromise;
  check('export can rescue history when automatic saving fails', JSON.parse(await readFile(await blockedDownload.path(), 'utf8')).sessions[0].score === 1);

  const checkpointContext = await browser.newContext();
  await checkpointContext.addInitScript(storageKey => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (name, value) {
      if (name === storageKey) throw new DOMException('History quota exceeded', 'QuotaExceededError');
      return original.call(this, name, value);
    };
  }, key);
  const checkpointPage = await trackedPage(checkpointContext);
  await fixedClock(checkpointPage);
  await checkpointPage.goto(app);
  await configureSimpleRound(checkpointPage);
  await checkpointPage.getByRole('button', { name: 'Start a round' }).click();
  await checkpointPage.clock.runFor(1000);
  await checkpointPage.locator('#answer').fill('4');
  await checkpointPage.clock.runFor(14000);
  check('a compact checkpoint preserves the completed round if the full history save fails', (await activeSession(checkpointPage)).completed && /Saved automatically/.test(await text(checkpointPage, '#saved-status')));
  await checkpointPage.reload();
  check('completed checkpoint recovery keeps the score visible after reload', await text(checkpointPage, '#round-count') === '1' && await checkpointPage.locator('#recovery-notice').isVisible());

  const corruptContext = await browser.newContext();
  await corruptContext.addInitScript(storageKey => localStorage.setItem(storageKey, 'invalid existing history'), key);
  const corruptPage = await trackedPage(corruptContext);
  await corruptPage.goto(app);
  await corruptPage.locator('#duration').fill('15');
  await corruptPage.locator('#duration').blur();
  check('unreadable saved data is preserved and explained', /could not be read/.test(await text(corruptPage, '#storage-warning')) && await corruptPage.evaluate(storageKey => localStorage.getItem(storageKey), key) === 'invalid existing history');

  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  await mobileContext.addInitScript(({ storageKey, data }) => localStorage.setItem(storageKey, data), { storageKey: key, data: exported });
  const mobilePage = await trackedPage(mobileContext);
  await fixedClock(mobilePage);
  await mobilePage.goto(app);
  await noOverflow(mobilePage, 'mobile setup and populated history fit the viewport');
  await mobilePage.locator('summary').click();
  await noOverflow(mobilePage, 'mobile range controls fit the viewport');
  await mobilePage.screenshot({ path: join(screenshotDirectory, 'arithmetic-mobile.png'), fullPage: true });
  await mobilePage.getByRole('button', { name: 'Start a round' }).click();
  await noOverflow(mobilePage, 'mobile workout fits the viewport');
  check('mobile answer is visible and uses the numeric keyboard', await mobilePage.locator('#answer').getAttribute('inputmode') === 'numeric' && await mobilePage.locator('#answer').evaluate(element => { const bounds = element.getBoundingClientRect(); return bounds.top >= 0 && bounds.bottom <= innerHeight; }));
  await mobilePage.clock.runFor(15000);
  await noOverflow(mobilePage, 'mobile results fit the viewport');
  await mobilePage.setViewportSize({ width: 320, height: 720 });
  await mobilePage.getByRole('button', { name: 'Change settings' }).click();
  await noOverflow(mobilePage, 'narrow 320px screen fits the viewport');
  check('basic accessibility labels and structure are present', await mobilePage.locator('html').getAttribute('lang') === 'en' && await mobilePage.getByRole('main').count() === 1 && await mobilePage.getByLabel('History settings filter').count() === 1 && await mobilePage.getByLabel('History date filter').count() === 1 && await mobilePage.getByLabel('Import backup').count() === 1);
  assert.deepEqual(consoleErrors, [], 'Browser errors');
  check('browser execution has no uncaught errors or console errors', consoleErrors.length === 0);
  console.log(`\n${completedChecks} browser checks passed. Screenshots: ${screenshotDirectory}/arithmetic-{desktop,mobile}.png`);
} finally {
  await browser.close();
}
