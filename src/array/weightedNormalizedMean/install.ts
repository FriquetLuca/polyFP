import { weightedNormalizedMean } from './index.js';

export type * from './types';

if (!Array.prototype.weightedNormalizedMean) {
  Object.defineProperty(Array.prototype, 'weightedNormalizedMean', {
    value(this: number[], weights: number[]): number {
      return weightedNormalizedMean(this, weights);
    },
    writable: true,
    configurable: true,
  });
}
