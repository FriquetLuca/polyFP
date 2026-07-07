import { validateWeighted } from '../utils';

export function weightedMovingAverage(
  array: number[],
  weights: number[],
  windowSize: number
): number[] {
  if (windowSize <= 0) throw new Error('windowSize must be greater than zero');
  if (array.length < windowSize) return [];

  const wSum = validateWeighted(array, weights);
  if (wSum === 0) return [];

  const result: number[] = [];

  for (let i = 0; i <= array.length - windowSize; i++) {
    let acc = 0;
    for (let j = 0; j < windowSize; j++) {
      acc += array[i + j] * weights[j];
    }
    result.push(acc / wSum);
  }

  return result;
}
