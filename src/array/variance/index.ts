import { avg } from '../avg/index.js';

export function variance<T>(values: T[], fn: (val: T) => number): number {
  if (values.length === 0) return 0;
  const mean = avg(values, fn);
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    const d = fn(values[i]) - mean;
    sum += d * d;
  }
  return sum / values.length;
}
