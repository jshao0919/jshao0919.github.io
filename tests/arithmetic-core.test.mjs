import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_SETTINGS, validateSettings, profileKey, generateProblem, problemKey,
  summarizeSessions, buildProblemStats, buildOperationStats,
} from '../arithmetic/core.mjs';

test('defaults and form input validate without sharing mutable operation arrays', () => {
  const { settings, errors } = validateSettings();
  assert.deepEqual(errors, []);
  assert.deepEqual(settings, DEFAULT_SETTINGS);
  settings.operations.pop();
  assert.equal(DEFAULT_SETTINGS.operations.length, 4);
  assert.equal(validateSettings({ duration: '60' }).settings.duration, 60);
});

test('settings accept exact boundaries and reject invalid numbers, ranges, and operations', () => {
  assert.deepEqual(validateSettings({ duration: 15, additionMin: 0, additionMax: 1000, multiplicationMin: 1, multiplicationMax: 1000, multiplierMin: 1, multiplierMax: 1000 }).errors, []);
  assert.deepEqual(validateSettings({ duration: 600 }).errors, []);
  for (const invalid of [14, 601, 15.5, Infinity, NaN, '', null, true, 'invalid']) {
    assert.ok(validateSettings({ duration: invalid }).errors.length, `reject duration ${invalid}`);
  }
  for (const key of ['additionMin', 'additionMax', 'multiplicationMin', 'multiplicationMax', 'multiplierMin', 'multiplierMax']) {
    assert.ok(validateSettings({ [key]: 1001 }).errors.length, `reject excessive ${key}`);
    assert.ok(validateSettings({ [key]: -1 }).errors.length, `reject negative ${key}`);
  }
  assert.ok(validateSettings({ multiplicationMin: 0 }).errors.length);
  assert.ok(validateSettings({ multiplierMin: 0 }).errors.length);
  assert.ok(validateSettings({ additionMin: 5, additionMax: 4 }).errors.length);
  assert.ok(validateSettings({ multiplicationMin: 5, multiplicationMax: 4 }).errors.length);
  assert.ok(validateSettings({ multiplierMin: 5, multiplierMax: 4 }).errors.length);
  for (const operations of [[], null, 'add', ['power'], ['add', 'power']]) {
    assert.ok(validateSettings({ operations }).errors.length);
  }
  assert.deepEqual(validateSettings({ operations: ['divide', 'add', 'add'] }).settings.operations, ['add', 'divide']);
});

test('profile identities include every setting and ignore operation ordering and duplicates', () => {
  const key = profileKey(DEFAULT_SETTINGS);
  assert.equal(profileKey({ ...DEFAULT_SETTINGS, operations: ['divide', 'multiply', 'subtract', 'add', 'add'] }), key);
  for (const field of ['duration', 'additionMin', 'additionMax', 'multiplicationMin', 'multiplicationMax', 'multiplierMin', 'multiplierMax']) {
    assert.notEqual(profileKey({ ...DEFAULT_SETTINGS, [field]: DEFAULT_SETTINGS[field] + 1 }), key, field);
  }
  assert.notEqual(profileKey({ ...DEFAULT_SETTINGS, operations: ['add'] }), key);
  assert.throws(() => profileKey({ duration: -1 }), RangeError);
});

test('problem generation observes inclusive configured ranges and all arithmetic inverses', () => {
  for (const operation of ['add', 'subtract', 'multiply', 'divide']) {
    for (const sample of [0, 0.999999999]) {
      const settings = { ...DEFAULT_SETTINGS, operations: [operation], additionMin: 0, additionMax: 10, multiplicationMin: 2, multiplicationMax: 7, multiplierMin: 3, multiplierMax: 11 };
      const problem = generateProblem(settings, () => sample);
      assert.equal(problem.operation, operation);
      if (operation === 'add') {
        assert.equal(problem.answer, problem.a + problem.b);
        assert.equal(problem.a, sample === 0 ? 0 : 10);
        assert.equal(problem.b, sample === 0 ? 0 : 10);
      } else if (operation === 'subtract') {
        assert.equal(problem.answer, problem.a - problem.b);
        assert.equal(problem.b, sample === 0 ? 0 : 10);
        assert.equal(problem.answer, sample === 0 ? 0 : 10);
      } else if (operation === 'multiply') {
        assert.equal(problem.answer, problem.a * problem.b);
        assert.equal(problem.a, sample === 0 ? 2 : 7);
        assert.equal(problem.b, sample === 0 ? 3 : 11);
      } else {
        assert.equal(problem.answer, problem.a / problem.b);
        assert.equal(problem.b, sample === 0 ? 2 : 7);
        assert.equal(problem.answer, sample === 0 ? 3 : 11);
        assert.notEqual(problem.b, 0);
      }
      assert.ok(Number.isInteger(problem.answer) && problem.answer >= 0);
      assert.match(problem.expression, /^\d+ [\+−×÷] \d+$/u);
    }
  }
});

test('operation sampling reaches all selected operations and rejects unusable randomness', () => {
  assert.deepEqual([0, 0.25, 0.5, 0.75].map(value => generateProblem(DEFAULT_SETTINGS, () => value).operation), DEFAULT_SETTINGS.operations);
  for (const sample of [-0.01, 1, Infinity, NaN]) {
    assert.throws(() => generateProblem(DEFAULT_SETTINGS, () => sample), RangeError);
  }
  assert.throws(() => generateProblem({ operations: [] }), RangeError);
});

const attempt = (operation, a, b, elapsedMs, wrongAnswers = 0, solved = true) => ({ operation, a, b, elapsedMs, wrongAnswers, solved });
const sessions = [
  { completed: true, score: 2, attempts: [attempt('add', 2, 3, 1000), attempt('multiply', 7, 8, 5000, 1), attempt('add', 2, 3, 6000, 2, false)] },
  { completed: true, score: 0, attempts: [attempt('divide', 56, 7, 8000, 1, false)] },
  { completed: false, score: 99, attempts: [attempt('multiply', 7, 8, 9000, 3, false)] },
];

test('score summary excludes abandoned scores but counts submitted mistakes on unfinished prompts', () => {
  const { accuracy, ...summary } = summarizeSessions(sessions);
  assert.deepEqual(summary, {
    rounds: 2, totalSolved: 2, bestScore: 2, averageScore: 1,
    averageSeconds: 3,
  });
  assert.ok(Math.abs(accuracy - 100 / 3) < 1e-10);
  assert.deepEqual(summarizeSessions([]), { rounds: 0, totalSolved: 0, bestScore: 0, averageScore: 0, averageSeconds: null, accuracy: null });
  assert.equal(summarizeSessions([{ completed: true, score: 0, attempts: [attempt('add', 1, 2, 1000, 2, false)] }]).accuracy, 0);
  assert.equal(summarizeSessions([{ completed: true, score: 0, attempts: [] }]).accuracy, null);
});

test('exact problem statistics include unfinished timing and identify the slowest prompts', () => {
  assert.deepEqual(buildProblemStats(sessions), [
    { key: 'divide:56:7', expression: '56 ÷ 7', operation: 'divide', count: 1, averageSeconds: 8, maxSeconds: 8, wrongAnswers: 1, unfinished: 1 },
    { key: 'multiply:7:8', expression: '7 × 8', operation: 'multiply', count: 2, averageSeconds: 7, maxSeconds: 9, wrongAnswers: 4, unfinished: 1 },
    { key: 'add:2:3', expression: '2 + 3', operation: 'add', count: 2, averageSeconds: 3.5, maxSeconds: 6, wrongAnswers: 2, unfinished: 1 },
  ]);
  assert.notEqual(problemKey({ operation: 'add', a: 2, b: 3 }), problemKey({ operation: 'add', a: 3, b: 2 }));
});

test('operation statistics combine distinct prompts with counts, mistakes, and unfinished work', () => {
  assert.deepEqual(buildOperationStats(sessions), [
    { operation: 'divide', label: 'Division', count: 1, averageSeconds: 8, wrongAnswers: 1, unfinished: 1 },
    { operation: 'multiply', label: 'Multiplication', count: 2, averageSeconds: 7, wrongAnswers: 4, unfinished: 1 },
    { operation: 'add', label: 'Addition', count: 2, averageSeconds: 3.5, wrongAnswers: 2, unfinished: 1 },
  ]);
  const combined = buildOperationStats([{ attempts: [attempt('add', 1, 2, 1000), attempt('add', 3, 4, 3000)] }]);
  assert.equal(combined.length, 1);
  assert.equal(combined[0].averageSeconds, 2);
  assert.deepEqual(buildOperationStats([]), []);
});

test('empty and malformed persisted collections cannot poison aggregate numbers', () => {
  assert.deepEqual(buildProblemStats(null), []);
  assert.deepEqual(buildOperationStats([null, { attempts: [null, { operation: 'unknown' }] }]), []);
  const summary = summarizeSessions([null, { completed: true, score: Infinity, attempts: [attempt('add', 1, 2, -1, -2)] }]);
  assert.equal(summary.totalSolved, 0);
  assert.equal(summary.averageSeconds, 0);
  assert.equal(summary.accuracy, null);
});
