import { validateWeighted } from '../utils';

export function weightedGeometricMean(
  values: number[],
  weights: number[]
): number {
  const weightSum = validateWeighted(values, weights);
  if (weightSum === 0) return 0;

  let logSum = 0;

  for (let i = 0; i < values.length; i++) {
    if (values[i] <= 0) {
      throw new Error('geometric mean requires strictly positive values');
    }

    logSum += weights[i] * Math.log(values[i]);
  }

  return Math.exp(logSum / weightSum);
}
