import test from 'node:test';
import assert from 'node:assert/strict';
import { seededRandom, makeCfarScene, cfar, fuseEvidence } from '../uas/lab-core.js';

function near(actual, expected, tolerance = 1e-11) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} differs from ${expected}`);
}

test('seeded scenes are reproducible, finite, nonnegative, and explicitly synthetic', () => {
  assert.deepEqual(makeCfarScene(), makeCfarScene());
  assert.notDeepEqual(makeCfarScene({ seed: 8 }), makeCfarScene({ seed: 7 }));
  for (const mode of ['homogeneous', 'clutter-edge', 'multiple']) {
    const scene = makeCfarScene({ mode });
    assert.equal(scene.samples.length, 96);
    assert.ok(scene.samples.every(value => Number.isFinite(value) && value >= 0));
    assert.equal(scene.targets.length, mode === 'multiple' ? 2 : 1);
  }
  const noTarget = makeCfarScene({ targetStrength: 0 });
  assert.deepEqual(noTarget.targets, []);
  const withTarget = makeCfarScene({ targetStrength: 14 });
  near(withTarget.samples[withTarget.targets[0]] - noTarget.samples[withTarget.targets[0]], 14);
  const flat = makeCfarScene({ targetStrength: 0 });
  const edge = makeCfarScene({ targetStrength: 0, mode: 'clutter-edge' });
  edge.samples.forEach((value, index) => near(value, flat.samples[index] * (index >= 48 ? 4 : 1)));
  const random = seededRandom(0);
  assert.ok(Array.from({ length: 1000 }, random).every(value => value >= 0 && value < 1));
});

test('CA-CFAR uses 2N references, excludes CUT and guard cells, and leaves edges unevaluated', () => {
  const result = cfar({ samples: [1, 2, 1000000, 10, 1000000, 3, 4], training: 2, guard: 1, pfa: 0.1 });
  const alpha = 4 * (Math.pow(0.1, -1 / 4) - 1);
  near(result.alpha, alpha);
  assert.equal(result.referenceCount, 4);
  near(result.thresholds[3], 2.5 * alpha);
  assert.equal(result.detections[3], true);
  for (const i of [0, 1, 2, 4, 5, 6]) {
    assert.equal(result.thresholds[i], null);
    assert.equal(result.detections[i], false);
  }
});

test('moving reference windows match independent direct calculations', () => {
  const samples = makeCfarScene({ bins: 150, mode: 'multiple' }).samples;
  for (const training of [1, 3, 8, 17]) {
    for (const guard of [0, 2, 5]) {
      const result = cfar({ samples, training, guard, pfa: 0.03 });
      const radius = training + guard;
      for (let i = radius; i < samples.length - radius; i += 1) {
        const refs = [...samples.slice(i - radius, i - guard), ...samples.slice(i + guard + 1, i + radius + 1)];
        const threshold = result.alpha * refs.reduce((a, b) => a + b, 0) / refs.length;
        near(result.thresholds[i], threshold, 1e-10);
        assert.equal(result.detections[i], samples[i] > threshold);
      }
    }
  }
});

test('smaller nominal Pfa increases threshold; equal power does not exceed threshold', () => {
  const samples = Array(25).fill(2);
  const lower = cfar({ samples, pfa: 0.001 });
  const higher = cfar({ samples, pfa: 0.1 });
  assert.ok(lower.thresholds[12] > higher.thresholds[12]);
  const zero = cfar({ samples: Array(25).fill(0) });
  assert.equal(zero.thresholds[12], 0);
  assert.equal(zero.detections[12], false);
});

test('Monte Carlo false-alarm rate agrees with formula for independent exponential power', () => {
  const random = seededRandom(814);
  const trials = 50000;
  const pfa = 0.05;
  let alarms = 0;
  // Separate windows keep these Bernoulli trials independent. This is a
  // distribution check, not a claim about correlated neighboring windows.
  for (let trial = 0; trial < trials; trial += 1) {
    const samples = Array.from({ length: 11 }, () => -Math.log1p(-random()));
    if (cfar({ samples, training: 4, guard: 1, pfa }).detections[5]) alarms += 1;
  }
  const standardError = Math.sqrt(pfa * (1 - pfa) / trials);
  assert.ok(Math.abs(alarms / trials - pfa) < 6 * standardError);
});

test('scene and CFAR validation reject nonsensical inputs', () => {
  for (const seed of [-1, 1.5, NaN, Infinity, 0x100000000]) assert.throws(() => seededRandom(seed));
  for (const options of [{ bins: 4 }, { mode: 'unknown' }, { targetStrength: -1 }, { targetStrength: Infinity }]) {
    assert.throws(() => makeCfarScene(options));
  }
  const samples = Array(31).fill(1);
  for (const options of [{ pfa: 0 }, { pfa: 1 }, { pfa: NaN }, { training: 0 }, { training: 1.5 }, { guard: -1 }, { samples: [1] }, { samples: [NaN] }, { samples: [-1] }]) {
    assert.throws(() => cfar({ samples, ...options }));
  }
});

test('hypothetical independent evidence follows Bayes odds and preserves neutral evidence', () => {
  const result = fuseEvidence({ prior: 0.1, likelihoodRatios: [3, 2] });
  near(result.priorOdds, 1 / 9);
  near(result.combinedLikelihoodRatio, 6);
  near(result.posteriorOdds, 2 / 3);
  near(result.posterior, 0.4);
  near(fuseEvidence({ prior: 0.1, likelihoodRatios: [1, 1] }).posterior, 0.1);
  near(fuseEvidence({ prior: 0.1, likelihoodRatios: [] }).posterior, 0.1);
  assert.equal(result.usedEvidenceCount, 2);
});

test('dependent evidence refuses a numeric posterior, avoiding false confidence from duplicate reports', () => {
  const once = fuseEvidence({ prior: 0.1, likelihoodRatios: [9] });
  const incorrectlyDuplicated = fuseEvidence({ prior: 0.1, likelihoodRatios: [9, 9] });
  near(once.posterior, 0.5);
  near(incorrectlyDuplicated.posterior, 0.9);
  const dependent = fuseEvidence({ prior: 0.1, likelihoodRatios: [9, 9], assumeIndependent: false });
  assert.equal(dependent.posterior, null);
  assert.equal(dependent.posteriorOdds, null);
  assert.equal(dependent.combinedLikelihoodRatio, null);
  assert.equal(dependent.usedEvidenceCount, 0);
  assert.match(dependent.assumption, /joint model/);
});

test('fusion is stable at extreme odds and validates all input values', () => {
  assert.equal(fuseEvidence({ prior: 0.5, likelihoodRatios: [1e300, 1e300] }).posterior, 1);
  assert.equal(fuseEvidence({ prior: 0.5, likelihoodRatios: [1e-300, 1e-300] }).posterior, 0);
  for (const options of [{ prior: 0 }, { prior: 1 }, { prior: NaN }, { likelihoodRatios: [0] }, { likelihoodRatios: [-1] }, { likelihoodRatios: [Infinity] }, { likelihoodRatios: ['3'] }, { likelihoodRatios: null }, { assumeIndependent: 'yes' }]) {
    assert.throws(() => fuseEvidence({ prior: 0.1, likelihoodRatios: [3], ...options }));
  }
});
