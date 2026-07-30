import { validateWeighted } from '../utils.js';

export function weightedHarmonicMean(
  values: number[],
  weights: number[]
): number {
  const weightSum = validateWeighted(values, weights);
  if (weightSum === 0) return 0;

  let denominator = 0;

  for (let i = 0; i < values.length; i++) {
    if (values[i] === 0) {
      throw new Error('harmonic mean requires non-zero values');
    }

    denominator += weights[i] / values[i];
  }

  return weightSum / denominator;
}
