import { extendPrototype } from '../../utils.js';
import { weightedRootMeanSquare } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  weightedRootMeanSquare(this: number[], weights: number[]): number {
    return weightedRootMeanSquare(this, weights);
  },
});
