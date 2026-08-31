import { extendPrototype } from '../../utils.js';
import { weightedHarmonicMean } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  weightedHarmonicMean(this: number[], weights: number[]): number {
    return weightedHarmonicMean(this, weights);
  },
});
