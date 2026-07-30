import { weightedHarmonicMean } from './index.js';

export type * from './types';

if (!Array.prototype.weightedHarmonicMean) {
  Object.defineProperty(Array.prototype, 'weightedHarmonicMean', {
    value(this: number[], weights: number[]): number {
      return weightedHarmonicMean(this, weights);
    },
    writable: true,
    configurable: true,
  });
}
