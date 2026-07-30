import { medianAbsoluteDeviation } from '../medianAbsoluteDeviation/index.js';

export const medianAbsoluteDeviationNormalized = <T>(
  values: T[],
  fn: (val: T) => number
): number => medianAbsoluteDeviation(values, fn) * 1.4826;
