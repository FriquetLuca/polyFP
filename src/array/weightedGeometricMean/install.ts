import { extendPrototype } from '../../utils.js';
import { weightedGeometricMean } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  weightedGeometricMean(this: number[], weights: number[]): number {
    return weightedGeometricMean(this, weights);
  },
});
