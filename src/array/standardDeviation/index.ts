import { variance } from '../variance';

export const standardDeviation = <T>(
  values: T[],
  fn: (val: T) => number
): number => Math.sqrt(variance(values, fn));
