import { validateWeighted } from '../utils';

export function weightedRootMeanSquare(
  values: number[],
  weights: number[]
): number {
  const weightSum = validateWeighted(values, weights);
  if (weightSum === 0) return 0;

  let sum = 0;

  for (let i = 0; i < values.length; i++) {
    sum += weights[i] * values[i] * values[i];
  }

  return Math.sqrt(sum / weightSum);
}
