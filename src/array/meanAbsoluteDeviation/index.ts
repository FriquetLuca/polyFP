import { avg } from '../avg/index.js';

export function meanAbsoluteDeviation<T>(
  values: T[],
  fn: (val: T) => number
): number {
  if (values.length === 0) return 0;
  const mean = avg(values, fn);
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += Math.abs(fn(values[i]) - mean);
  }
  return sum / values.length;
}
