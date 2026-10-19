/** Pure problem generation and statistics shared by the trainer and its tests. */
export const DEFAULT_SETTINGS = Object.freeze({
  duration: 120,
  operations: Object.freeze(['add', 'subtract', 'multiply', 'divide']),
  additionMin: 2,
  additionMax: 100,
  multiplicationMin: 2,
  multiplicationMax: 12,
  multiplierMin: 2,
  multiplierMax: 100,
});

const OPERATIONS = ['add', 'subtract', 'multiply', 'divide'];
const SYMBOLS = { add: '+', subtract: '−', multiply: '×', divide: '÷' };
const LABELS = { add: 'Addition', subtract: 'Subtraction', multiply: 'Multiplication', divide: 'Division' };
const NUMBER_FIELDS = [
  ['duration', 'Duration', 15, 600],
  ['additionMin', 'Addition minimum', 0, 1000],
  ['additionMax', 'Addition maximum', 0, 1000],
  ['multiplicationMin', 'Multiplication minimum', 1, 1000],
  ['multiplicationMax', 'Multiplication maximum', 1, 1000],
  ['multiplierMin', 'Multiplier minimum', 1, 1000],
  ['multiplierMax', 'Multiplier maximum', 1, 1000],
];

/** Missing fields receive defaults. Form-number strings are accepted; invalid fields yield errors. */
export function validateSettings(input = {}) {
  const source = input && typeof input === 'object' ? input : {};
  const errors = [];
  const settings = {};
  for (const [key, label, min, max] of NUMBER_FIELDS) {
    const raw = source[key] === undefined ? DEFAULT_SETTINGS[key] : source[key];
    const value = typeof raw === 'number' || (typeof raw === 'string' && raw.trim() !== '')
      ? Number(raw) : NaN;
    settings[key] = value;
    if (!Number.isInteger(value) || value < min || value > max) {
      errors.push(`${label} must be a whole number from ${min} to ${max}.`);
    }
  }

  const operations = source.operations === undefined ? DEFAULT_SETTINGS.operations : source.operations;
  if (!Array.isArray(operations) || operations.length === 0) {
    errors.push('Choose at least one operation.');
    settings.operations = [];
  } else {
    if (operations.some(operation => !OPERATIONS.includes(operation))) {
      errors.push('Choose only addition, subtraction, multiplication, or division.');
    }
    settings.operations = OPERATIONS.filter(operation => operations.includes(operation));
  }

  for (const [minKey, maxKey, label] of [
    ['additionMin', 'additionMax', 'Addition'],
    ['multiplicationMin', 'multiplicationMax', 'Multiplication'],
    ['multiplierMin', 'multiplierMax', 'Multiplier'],
  ]) {
    if (Number.isFinite(settings[minKey]) && Number.isFinite(settings[maxKey]) && settings[minKey] > settings[maxKey]) {
      errors.push(`${label} minimum must not exceed its maximum.`);
    }
  }
  return { settings, errors };
}

function checkedSettings(input) {
  const result = validateSettings(input);
  if (result.errors.length) throw new RangeError(result.errors.join(' '));
  return result.settings;
}

/** Stable identity for like-for-like comparisons, independent of operation checkbox order. */
export function profileKey(input) {
  const settings = checkedSettings(input);
  return JSON.stringify({
    duration: settings.duration,
    operations: [...settings.operations].sort(),
    additionMin: settings.additionMin,
    additionMax: settings.additionMax,
    multiplicationMin: settings.multiplicationMin,
    multiplicationMax: settings.multiplicationMax,
    multiplierMin: settings.multiplierMin,
    multiplierMax: settings.multiplierMax,
  });
}

function randomInteger(min, max, rng) {
  const sample = rng();
  if (!Number.isFinite(sample) || sample < 0 || sample >= 1) {
    throw new RangeError('The random source must return a number from 0 (inclusive) to 1 (exclusive).');
  }
  return min + Math.floor(sample * (max - min + 1));
}

/** Subtraction reverses addition; division reverses multiplication, so answers are whole and nonnegative. */
export function generateProblem(input = DEFAULT_SETTINGS, rng = Math.random) {
  const settings = checkedSettings(input);
  const operation = settings.operations[randomInteger(0, settings.operations.length - 1, rng)];
  let a;
  let b;
  let answer;
  if (operation === 'add' || operation === 'subtract') {
    const first = randomInteger(settings.additionMin, settings.additionMax, rng);
    const second = randomInteger(settings.additionMin, settings.additionMax, rng);
    if (operation === 'add') {
      a = first;
      b = second;
      answer = first + second;
    } else {
      a = first + second;
      b = first;
      answer = second;
    }
  } else {
    const first = randomInteger(settings.multiplicationMin, settings.multiplicationMax, rng);
    const second = randomInteger(settings.multiplierMin, settings.multiplierMax, rng);
    if (operation === 'multiply') {
      a = first;
      b = second;
      answer = first * second;
    } else {
      a = first * second;
      b = first;
      answer = second;
    }
  }
  return { operation, a, b, answer, expression: `${a} ${SYMBOLS[operation]} ${b}` };
}

export function problemKey(problem) {
  return `${problem.operation}:${problem.a}:${problem.b}`;
}

const safeCount = value => Number.isSafeInteger(value) && value >= 0 ? value : 0;
const safeElapsed = value => Number.isFinite(value) && value >= 0 ? value : 0;
const sessionList = sessions => Array.isArray(sessions) ? sessions.filter(session => session && typeof session === 'object') : [];
const attemptsOf = session => Array.isArray(session.attempts) ? session.attempts.filter(attempt => attempt && typeof attempt === 'object') : [];

/** Completed-round scores only. Average response time excludes unfinished prompts; accuracy is a percentage. */
export function summarizeSessions(sessions) {
  const completed = sessionList(sessions).filter(session => session.completed === true);
  const scores = completed.map(session => safeCount(session.score));
  const attempts = completed.flatMap(attemptsOf);
  const solvedAttempts = attempts.filter(attempt => attempt.solved === true);
  const totalSolved = scores.reduce((sum, score) => sum + score, 0);
  const wrongAnswers = attempts.reduce((sum, attempt) => sum + safeCount(attempt.wrongAnswers), 0);
  return {
    rounds: completed.length,
    totalSolved,
    bestScore: scores.length ? Math.max(...scores) : 0,
    averageScore: scores.length ? totalSolved / scores.length : 0,
    averageSeconds: solvedAttempts.length
      ? solvedAttempts.reduce((sum, attempt) => sum + safeElapsed(attempt.elapsedMs), 0) / solvedAttempts.length / 1000
      : null,
    accuracy: totalSolved + wrongAnswers > 0 ? totalSolved / (totalSolved + wrongAnswers) * 100 : null,
  };
}

function aggregateAttempts(sessions, grouping) {
  const grouped = new Map();
  for (const session of sessionList(sessions)) {
    for (const attempt of attemptsOf(session)) {
      if (!OPERATIONS.includes(attempt.operation)) continue;
      const { key, ...identity } = grouping(attempt);
      if (!grouped.has(key)) {
        grouped.set(key, { key, ...identity, count: 0, totalMs: 0, maxMs: 0, wrongAnswers: 0, unfinished: 0 });
      }
      const aggregate = grouped.get(key);
      const elapsed = safeElapsed(attempt.elapsedMs);
      aggregate.count += 1;
      aggregate.totalMs += elapsed;
      aggregate.maxMs = Math.max(aggregate.maxMs, elapsed);
      aggregate.wrongAnswers += safeCount(attempt.wrongAnswers);
      if (attempt.solved !== true) aggregate.unfinished += 1;
    }
  }
  return [...grouped.values()].map(({ totalMs, maxMs, ...group }) => ({
    ...group,
    averageSeconds: totalMs / group.count / 1000,
    maxSeconds: maxMs / 1000,
  })).sort((a, b) => b.averageSeconds - a.averageSeconds || b.count - a.count || a.key.localeCompare(b.key));
}

/** Slowest exact prompts first. Counts and times include unfinished prompts from abandoned and completed rounds. */
export function buildProblemStats(sessions) {
  return aggregateAttempts(sessions, attempt => ({
    key: problemKey(attempt),
    expression: `${attempt.a} ${SYMBOLS[attempt.operation]} ${attempt.b}`,
    operation: attempt.operation,
  }));
}

/** Slowest operation first, using the same inclusion rules as problem statistics. */
export function buildOperationStats(sessions) {
  return aggregateAttempts(sessions, attempt => ({
    key: attempt.operation,
    operation: attempt.operation,
    label: LABELS[attempt.operation],
  })).map(({ key, maxSeconds, ...stats }) => stats);
}
