import { extendPrototype } from '../../utils.js';
import { weightedNormalizedMean } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  weightedNormalizedMean(this: number[], weights: number[]): number {
    return weightedNormalizedMean(this, weights);
  },
});
