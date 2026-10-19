import { DEFAULT_SETTINGS, validateSettings } from './core.mjs';

export const STORAGE_KEY = 'mathjock.arithmetic.v1';
export const ACTIVE_KEY = 'mathjock.arithmetic.active.v1';

const MAX_BYTES = 5 * 1024 * 1024;
const MAX_SESSIONS = 2000;
const MAX_ATTEMPTS = 100000;
const SYMBOLS = { add: '+', subtract: '−', multiply: '×', divide: '÷' };
const OPERATIONS = ['add', 'subtract', 'multiply', 'divide'];
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const integer = (value, min, max) => Number.isSafeInteger(value) && value >= min && value <= max;
const fail = message => { throw new Error(message); };

function settingsOf(value, label) {
  if (!object(value)) fail(`${label} must be an object.`);
  const { settings, errors } = validateSettings(value);
  if (errors.length) fail(`${label}: ${errors.join(' ')}`);
  return settings;
}

function timestamp(value, label) {
  if (typeof value !== 'string' || value.length > 64) fail(`${label} must be an ISO date and time.`);
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,9}))?(Z|[+-]\d{2}:\d{2})$/.exec(value);
  if (!match) fail(`${label} must be an ISO date and time with a timezone.`);
  const [, yearText, monthText, dayText, hourText, minuteText, secondText, , zone] = match;
  const [year, month, day, hour, minute, second] = [yearText, monthText, dayText, hourText, minuteText, secondText].map(Number);
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const badZone = zone !== 'Z' && (Number(zone.slice(1, 3)) > 23 || Number(zone.slice(4, 6)) > 59);
  if (month < 1 || month > 12 || day < 1 || day > days[month - 1] || hour > 23 || minute > 59 || second > 59 || badZone) {
    fail(`${label} contains an invalid date or time.`);
  }
  const millis = Date.parse(value);
  if (!Number.isFinite(millis)) fail(`${label} contains an invalid date or time.`);
  const normalized = new Date(millis).toISOString();
  if (normalized.length !== 24) fail(`${label} must fall between years 0000 and 9999 in UTC.`);
  return normalized;
}

function within(value, min, max) {
  return value >= min && value <= max;
}

function normalizeAttempt(value, settings, roundElapsed, label) {
  if (!object(value)) fail(`${label} must be an object.`);
  const { operation, a, b, answer, elapsedMs, wrongAnswers, solved } = value;
  if (!OPERATIONS.includes(operation) || !settings.operations.includes(operation)) fail(`${label} has an operation outside its round settings.`);
  if (![a, b, answer].every(number => integer(number, 0, 1000000))) fail(`${label} must have whole-number operands and answer from 0 to 1,000,000.`);
  let expected;
  let inRange;
  if (operation === 'add') {
    expected = a + b;
    inRange = within(a, settings.additionMin, settings.additionMax) && within(b, settings.additionMin, settings.additionMax);
  } else if (operation === 'subtract') {
    expected = a - b;
    inRange = within(b, settings.additionMin, settings.additionMax) && within(answer, settings.additionMin, settings.additionMax);
  } else if (operation === 'multiply') {
    expected = a * b;
    inRange = within(a, settings.multiplicationMin, settings.multiplicationMax) && within(b, settings.multiplierMin, settings.multiplierMax);
  } else {
    expected = b === 0 ? NaN : a / b;
    inRange = within(b, settings.multiplicationMin, settings.multiplicationMax) && within(answer, settings.multiplierMin, settings.multiplierMax);
  }
  if (answer !== expected || !inRange) fail(`${label} does not match the arithmetic or operand ranges for its round.`);
  if (!Number.isFinite(elapsedMs) || elapsedMs < 0 || elapsedMs > roundElapsed + 1) fail(`${label} has an invalid response time.`);
  if (!integer(wrongAnswers, 0, 100000)) fail(`${label} has an invalid wrong-answer count.`);
  if (typeof solved !== 'boolean') fail(`${label} must say whether it was solved.`);
  return { operation, a, b, answer, expression: `${a} ${SYMBOLS[operation]} ${b}`, elapsedMs, wrongAnswers, solved };
}

function normalizeSession(value, index) {
  const label = `Round ${index + 1}`;
  if (!object(value)) fail(`${label} must be an object.`);
  if (typeof value.id !== 'string' || value.id.trim().length === 0 || value.id.length > 120) fail(`${label} must have an ID of 1 to 120 characters.`);
  const startedAt = timestamp(value.startedAt, `${label} start`);
  const endedAt = timestamp(value.endedAt, `${label} end`);
  if (Date.parse(endedAt) < Date.parse(startedAt)) fail(`${label} ends before it starts.`);
  if (typeof value.completed !== 'boolean') fail(`${label} must say whether it was completed.`);
  const settings = settingsOf(value.settings, `${label} settings`);
  const durationMs = settings.duration * 1000;
  if (!Number.isFinite(value.elapsedMs) || value.elapsedMs < 0 || value.elapsedMs > durationMs + 1) fail(`${label} has an invalid elapsed time.`);
  if (value.completed && Math.abs(value.elapsedMs - durationMs) > 1) fail(`${label} is marked complete but has not reached its configured duration.`);
  if (!Array.isArray(value.attempts) || value.attempts.length > 5000) fail(`${label} must contain at most 5,000 problem attempts.`);
  const attempts = value.attempts.map((attempt, i) => normalizeAttempt(attempt, settings, value.elapsedMs, `${label}, problem ${i + 1}`));
  if (!integer(value.score, 0, attempts.length) || value.score !== attempts.filter(attempt => attempt.solved).length) fail(`${label} score must equal its solved-problem count.`);
  if (attempts.some((attempt, i) => !attempt.solved && i !== attempts.length - 1)) fail(`${label} can have an unfinished problem only at the end.`);
  if (attempts.reduce((sum, attempt) => sum + attempt.elapsedMs, 0) > value.elapsedMs + 5) fail(`${label} response times exceed the elapsed round time.`);
  return {
    id: value.id, startedAt, endedAt, settings, completed: value.completed,
    score: value.score, elapsedMs: value.elapsedMs, attempts,
  };
}

function normalizeSessions(values, duplicatePolicy = 'reject') {
  if (!Array.isArray(values)) fail('The backup must contain a sessions array.');
  if (values.length > MAX_SESSIONS && duplicatePolicy === 'reject') fail('A backup can contain at most 2,000 rounds.');
  const byId = new Map();
  let totalAttempts = 0;
  for (let i = 0; i < values.length; i += 1) {
    const session = normalizeSession(values[i], i);
    if (byId.has(session.id)) {
      if (duplicatePolicy === 'reject') fail(`Round ${i + 1} has a duplicate ID.`);
      continue;
    }
    byId.set(session.id, session);
    if (byId.size > MAX_SESSIONS) fail('History can contain at most 2,000 rounds. Export your history before adding more.');
    totalAttempts += session.attempts.length;
    if (totalAttempts > MAX_ATTEMPTS) fail('History can contain at most 100,000 problem attempts.');
  }
  return [...byId.values()].sort((a, b) => a.startedAt.localeCompare(b.startedAt) || a.id.localeCompare(b.id));
}

/** Validate untrusted imported/local JSON and retain only documented, normalized fields. */
export function parseBackup(raw) {
  if (typeof raw !== 'string') fail('Choose a JSON text backup.');
  if (raw.length > MAX_BYTES || new TextEncoder().encode(raw).length > MAX_BYTES) fail('The backup must be 5 MB or smaller.');
  let value;
  try { value = JSON.parse(raw); } catch { fail('This file is not valid JSON.'); }
  if (!object(value) || value.version !== 1) fail('This is not a supported version 1 arithmetic backup.');
  const settings = settingsOf(value.settings === undefined ? DEFAULT_SETTINGS : value.settings, 'Saved settings');
  return { version: 1, settings, sessions: normalizeSessions(value.sessions) };
}

/** Merge without overwriting an existing ID, including when imported content conflicts. */
export function mergeSessions(existing, incoming) {
  if (!Array.isArray(existing) || !Array.isArray(incoming)) fail('History to merge must be an array of rounds.');
  return normalizeSessions([...existing, ...incoming], 'preserve');
}
