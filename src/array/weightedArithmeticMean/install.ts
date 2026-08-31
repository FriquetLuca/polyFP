import { extendPrototype } from '../../utils.js';
import { weightedArithmeticMean } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  weightedArithmeticMean(this: number[], weights: number[]): number {
    return weightedArithmeticMean(this, weights);
  },
});
