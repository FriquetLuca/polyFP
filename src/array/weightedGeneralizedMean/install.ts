import { extendPrototype } from '../../utils.js';
import { weightedGeneralizedMean } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  weightedGeneralizedMean(
    this: number[],
    weights: number[],
    p: number
  ): number {
    return weightedGeneralizedMean(this, weights, p);
  },
});
