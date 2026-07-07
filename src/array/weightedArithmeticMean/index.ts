import { validateWeighted } from '../utils';

export function weightedArithmeticMean(
  values: number[],
  weights: number[]
): number {
  let weightSum = validateWeighted(values, weights);
  if (weightSum === 0) return 0;
  let weightedSum = 0;

  for (let i = 0; i < values.length; i++) {
    weightedSum += values[i] * weights[i];
  }

  return weightSum === 0 ? 0 : weightedSum / weightSum;
}
