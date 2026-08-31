import { extendPrototype } from '../../utils.js';
import { weightedExponentialMovingAverage } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  weightedExponentialMovingAverage<T>(
    this: T[],
    fn: (val: T) => number,
    alpha: number
  ): number[] {
    return weightedExponentialMovingAverage(this, fn, alpha);
  },
});
