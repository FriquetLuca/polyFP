import { extendPrototype } from '../../utils.js';
import { exponentialMovingAverage } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  exponentialMovingAverage<T>(
    this: T[],
    fn: (val: T) => number,
    alpha: number
  ): number[] {
    return exponentialMovingAverage(this, fn, alpha);
  },
});
