import { extendPrototype } from '../../utils.js';
import { weightedMovingAverage } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  weightedMovingAverage(
    this: number[],
    weights: number[],
    windowSize: number
  ): number[] {
    return weightedMovingAverage(this, weights, windowSize);
  },
});
