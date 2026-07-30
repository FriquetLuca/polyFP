import { variance } from '../variance/index.js';

export const standardDeviation = <T>(
  values: T[],
  fn: (val: T) => number
): number => Math.sqrt(variance(values, fn));
