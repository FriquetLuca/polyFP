import { extendPrototype } from '../../utils.js';
import { simpleMovingAverage } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  simpleMovingAverage<T>(
    this: T[],
    fn: (val: T) => number,
    windowSize: number
  ): number[] {
    return simpleMovingAverage(this, fn, windowSize);
  },
});
