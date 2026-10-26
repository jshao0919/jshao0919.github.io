/**
 * Normalized educational experiments, not operational sensor parameters.
 * CA-CFAR assumes independent, identically distributed exponential power
 * samples (single-look square-law detection) in a homogeneous background.
 * Under that model, alpha = N * (Pfa ** (-1 / N) - 1).
 */

function finiteNumber(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TypeError(`${label} must be a finite number.`);
  }
}

function integerInRange(value, min, max, label) {
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new RangeError(`${label} must be an integer from ${min} to ${max}.`);
  }
}

/** A reproducible Mulberry32 generator returning numbers in [0, 1). */
export function seededRandom(seed) {
  integerInRange(seed, 0, 0xffffffff, 'Seed');
  let state = seed >>> 0;
  return function random() {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * An abstract line of normalized power samples. Targets are injected peaks,
 * not physical target returns. Strength is additive normalized power.
 * modes: homogeneous, clutter-edge, multiple. No distance or time units.
 */
export function makeCfarScene({
  seed = 7,
  mode = 'homogeneous',
  bins = 96,
  targetStrength = 14,
} = {}) {
  integerInRange(bins, 24, 100000, 'Number of samples');
  finiteNumber(targetStrength, 'Peak strength');
  if (targetStrength < 0) throw new RangeError('Peak strength cannot be negative.');
  if (!['homogeneous', 'clutter-edge', 'multiple'].includes(mode)) {
    throw new RangeError('Unknown scene mode.');
  }
  const random = seededRandom(seed);
  const samples = Array.from({ length: bins }, (_, i) => {
    const mean = mode === 'clutter-edge' && i >= Math.floor(bins / 2) ? 4 : 1;
    return -Math.log1p(-random()) * mean;
  });
  const center = Math.floor(bins * 0.6);
  const targets = targetStrength === 0 ? [] : mode === 'multiple' ? [center, center + 3] : [center];
  for (const index of targets) samples[index] += targetStrength;
  if (samples.some(value => !Number.isFinite(value))) {
    throw new RangeError('Peak strength is too large for this experiment.');
  }
  return { samples, targets };
}

/**
 * CA-CFAR with `training` reference samples PER SIDE of the cell under test.
 * `guard` samples on EACH side and the test sample itself are excluded.
 * Edge samples with incomplete windows have null thresholds and no decision.
 * A boolean false with a null threshold means not evaluated, not a clear bin.
 */
export function cfar({ samples, training = 8, guard = 2, pfa = 0.01 } = {}) {
  if (!Array.isArray(samples) || samples.length === 0) {
    throw new TypeError('Samples must be a nonempty array.');
  }
  if (samples.some(value => typeof value !== 'number' || !Number.isFinite(value) || value < 0)) {
    throw new RangeError('Every power sample must be finite and nonnegative.');
  }
  integerInRange(training, 1, 100000, 'Reference samples per side');
  integerInRange(guard, 0, 100000, 'Guard samples per side');
  finiteNumber(pfa, 'False-alarm probability');
  if (pfa <= 0 || pfa >= 1) throw new RangeError('False-alarm probability must lie strictly between zero and one.');
  const radius = training + guard;
  if (samples.length < 2 * radius + 1) {
    throw new RangeError('The sample array must fit at least one complete reference window.');
  }
  const referenceCount = 2 * training;
  // expm1 avoids loss of precision when Pfa is near one.
  const alpha = referenceCount * Math.expm1(-Math.log(pfa) / referenceCount);
  if (!Number.isFinite(alpha)) throw new RangeError('False-alarm probability is too small for this experiment.');
  const thresholds = Array(samples.length).fill(null);
  const detections = Array(samples.length).fill(false);
  // A moving reference sum gives O(number of samples + window size) work.
  let referenceSum = 0;
  for (let offset = guard + 1; offset <= radius; offset += 1) {
    referenceSum += samples[radius - offset] + samples[radius + offset];
  }
  for (let i = radius; i < samples.length - radius; i += 1) {
    if (i > radius) {
      referenceSum += samples[i - guard - 1] - samples[i - radius - 1];
      referenceSum += samples[i + radius] - samples[i + guard];
    }
    const threshold = alpha * Math.max(0, referenceSum / referenceCount);
    if (!Number.isFinite(threshold)) throw new RangeError('Power samples are too large for this experiment.');
    thresholds[i] = threshold;
    detections[i] = samples[i] > threshold;
  }
  return { thresholds, detections, alpha, referenceCount };
}

/**
 * Bayes' rule for an explicitly hypothetical binary proposition.
 * Multiplying likelihood ratios is valid only with conditional independence
 * under BOTH hypotheses. Numbers supplied here are teaching inputs, never
 * calibrated confidence estimates for an actual aircraft or sensor network.
 */
export function fuseEvidence({ prior, likelihoodRatios, assumeIndependent = true } = {}) {
  finiteNumber(prior, 'Prior probability');
  if (prior <= 0 || prior >= 1) throw new RangeError('Prior probability must lie strictly between zero and one.');
  if (!Array.isArray(likelihoodRatios) || likelihoodRatios.length > 1000) {
    throw new TypeError('Likelihood ratios must be an array of at most 1,000 numbers.');
  }
  if (likelihoodRatios.some(value => typeof value !== 'number' || !Number.isFinite(value) || value <= 0)) {
    throw new RangeError('Each likelihood ratio must be finite and strictly positive.');
  }
  if (typeof assumeIndependent !== 'boolean') throw new TypeError('The independence assumption must be boolean.');
  const priorOdds = prior / (1 - prior);
  if (!assumeIndependent) {
    return {
      posterior: null,
      priorOdds,
      posteriorOdds: null,
      combinedLikelihoodRatio: null,
      usedEvidenceCount: 0,
      assumption: 'A joint model or one deliberately selected observation is required; no combined posterior computed.',
    };
  }
  const logRatio = likelihoodRatios.reduce((sum, ratio) => sum + Math.log(ratio), 0);
  const logOdds = Math.log(prior) - Math.log1p(-prior) + logRatio;
  // Stable logistic calculation even for very large or very small odds.
  const posterior = logOdds >= 0 ? 1 / (1 + Math.exp(-logOdds)) : Math.exp(logOdds) / (1 + Math.exp(logOdds));
  return {
    posterior,
    priorOdds,
    posteriorOdds: Math.exp(logOdds),
    combinedLikelihoodRatio: Math.exp(logRatio),
    usedEvidenceCount: likelihoodRatios.length,
    assumption: 'Hypothetical calculation: observations are conditionally independent under both hypotheses, and each likelihood ratio is valid.',
  };
}
