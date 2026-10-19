import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_SETTINGS } from '../arithmetic/core.mjs';
import { STORAGE_KEY, ACTIVE_KEY, parseBackup, mergeSessions } from '../arithmetic/data.mjs';

function session(overrides = {}) {
  return {
    id: 'round-1', startedAt: '2026-10-19T12:00:00.000Z', endedAt: '2026-10-19T12:02:00.000Z',
    settings: { ...DEFAULT_SETTINGS }, completed: true, score: 1, elapsedMs: 120000,
    attempts: [{ operation: 'add', a: 2, b: 3, answer: 5, expression: 'injected markup', elapsedMs: 2000, wrongAnswers: 1, solved: true }],
    ...overrides,
  };
}
const backup = (sessions = [session()], extra = {}) => JSON.stringify({ version: 1, sessions, ...extra });
const parsedSession = overrides => parseBackup(backup([session(overrides)])).sessions[0];

test('backup normalizes known fields, defaults, dates, and expressions without executing supplied content', () => {
  const result = parseBackup(backup([session({ startedAt: '2026-10-19T08:00:00-04:00', unknown: '<script>bad</script>' })], { unknown: true }));
  assert.equal(STORAGE_KEY, 'mathjock.arithmetic.v1');
  assert.equal(ACTIVE_KEY, 'mathjock.arithmetic.active.v1');
  assert.deepEqual(result.settings, DEFAULT_SETTINGS);
  assert.equal(result.sessions[0].startedAt, '2026-10-19T12:00:00.000Z');
  assert.equal(result.sessions[0].attempts[0].expression, '2 + 3');
  assert.equal('unknown' in result, false);
  assert.equal('unknown' in result.sessions[0], false);
  assert.equal(JSON.parse(JSON.stringify(result)).version, 1);
});

test('zero-time abandoned rounds and correctly inverted arithmetic are accepted', () => {
  assert.equal(parsedSession({ completed: false, score: 0, elapsedMs: 0, attempts: [] }).elapsedMs, 0);
  for (const [operation, a, b, answer] of [['subtract', 5, 2, 3], ['multiply', 2, 3, 6], ['divide', 6, 2, 3]]) {
    const round = parsedSession({ attempts: [{ operation, a, b, answer, elapsedMs: 2, wrongAnswers: 0, solved: true }] });
    assert.equal(round.attempts[0].answer, answer);
  }
  assert.equal(parsedSession({ completed: false, score: 0, elapsedMs: 2000, attempts: [{ operation: 'add', a: 2, b: 3, answer: 5, elapsedMs: 2000, wrongAnswers: 1, solved: false }] }).score, 0);
});

test('invalid JSON, versions, top-level shape, and oversized data are rejected clearly', () => {
  for (const raw of ['', '{', 'null', '[]', '{"version":2,"sessions":[]}', '{"version":1}', '{"version":1,"sessions":{}}']) {
    assert.throws(() => parseBackup(raw), Error);
  }
  assert.throws(() => parseBackup(null), /JSON text/);
  assert.throws(() => parseBackup(' '.repeat(5 * 1024 * 1024 + 1)), /5 MB/);
  assert.throws(() => parseBackup(backup([], { settings: { duration: 0 } })), /Duration/);
  assert.throws(() => parseBackup(backup([], { settings: [] })), /settings.*object/i);
});

test('session identity, timestamps, settings, and completion state are validated', () => {
  for (const overrides of [
    { id: '' }, { id: ' '.repeat(3) }, { id: 'x'.repeat(121) }, { id: 1 },
    { startedAt: '2026-02-30T12:00:00Z' }, { startedAt: '2026-13-01T12:00:00Z' },
    { startedAt: '2026-10-19' }, { startedAt: '2026-10-19T24:00:00Z' },
    { startedAt: '2026-10-19T12:00:00+99:00' }, { endedAt: '2026-10-18T12:00:00Z' },
    { completed: 'true' }, { settings: null }, { settings: { operations: [] } },
    { elapsedMs: -1 }, { elapsedMs: 120002 }, { completed: true, elapsedMs: 119000 },
    { score: 0 }, { score: 1.5 }, { score: -1 }, { attempts: null },
  ]) assert.throws(() => parsedSession(overrides), Error, JSON.stringify(overrides));
  assert.equal(parsedSession({ elapsedMs: 119999 }).elapsedMs, 119999);
  assert.equal(parsedSession({ elapsedMs: 120001 }).elapsedMs, 120001);
  assert.throws(() => parseBackup(backup([session(), session()])), /duplicate ID/);
});

test('attempts require matching integer arithmetic, configured ranges, and bounded counters', () => {
  const base = session().attempts[0];
  for (const overrides of [
    { operation: 'constructor' }, { operation: 'sqrt' }, { a: -1 }, { a: 1000001 }, { a: 2.5 },
    { answer: 6 }, { a: 1, answer: 4 }, { operation: 'subtract', a: 2, b: 3, answer: -1 },
    { operation: 'divide', a: 6, b: 0, answer: 0 }, { operation: 'divide', a: 7, b: 2, answer: 3 },
    { elapsedMs: -1 }, { elapsedMs: 120002 }, { wrongAnswers: -1 }, { wrongAnswers: 100001 },
    { wrongAnswers: 0.5 }, { solved: 1 },
  ]) assert.throws(() => parsedSession({ attempts: [{ ...base, ...overrides }] }), Error, JSON.stringify(overrides));
  assert.throws(() => parsedSession({ settings: { ...DEFAULT_SETTINGS, operations: ['multiply'] } }), /operation/);
  assert.throws(() => parsedSession({ attempts: [{ ...base, elapsedMs: 120000 }, { ...base, elapsedMs: 10 }], score: 2 }), /exceed/);
  assert.throws(() => parsedSession({ attempts: [{ ...base, solved: false }, base], score: 1 }), /unfinished/);
  assert.equal(parsedSession({ attempts: [{ ...base, elapsedMs: 60003 }, { ...base, elapsedMs: 60003 }], score: 2, elapsedMs: 120001 }).score, 2);
});

test('history collection limits reject excess rounds and problems', () => {
  assert.throws(() => parseBackup(backup(Array.from({ length: 2001 }, (_, i) => session({ id: `r${i}`, attempts: [], score: 0 })))), /2,000/);
  assert.throws(() => parsedSession({ attempts: Array.from({ length: 5001 }, () => session().attempts[0]), score: 5001 }), /5,000/);
});

test('merge preserves conflicting existing IDs, removes duplicates, sorts, and does not mutate inputs', () => {
  const existing = [session({ id: 'later' })];
  const original = structuredClone(existing);
  const earlier = session({ id: 'earlier', startedAt: '2026-10-18T12:00:00Z', endedAt: '2026-10-18T12:02:00Z' });
  const conflicting = session({ id: 'later', score: 0, attempts: [] });
  const result = mergeSessions(existing, [conflicting, earlier, earlier]);
  assert.deepEqual(result.map(round => round.id), ['earlier', 'later']);
  assert.equal(result[1].score, 1);
  assert.deepEqual(existing, original);
  assert.notEqual(result[1], existing[0]);
  assert.throws(() => mergeSessions({}, []), /array/);
  assert.throws(() => mergeSessions([], [session({ score: -1 })]), /score/);
});

test('merge enforces total history limits after deduplication', () => {
  const rounds = Array.from({ length: 2000 }, (_, i) => session({ id: `r${i}`, attempts: [], score: 0 }));
  assert.equal(mergeSessions(rounds, rounds).length, 2000);
  assert.throws(() => mergeSessions(rounds, [session({ id: 'overflow' })]), /2,000/);
  const base = session().attempts[0];
  const problems = Array.from({ length: 5000 }, () => ({ ...base, elapsedMs: 0 }));
  const dense = Array.from({ length: 20 }, (_, i) => session({ id: `dense${i}`, attempts: problems, score: 5000 }));
  assert.throws(() => mergeSessions(dense, [session({ id: 'too-many-attempts' })]), /100,000/);
});
