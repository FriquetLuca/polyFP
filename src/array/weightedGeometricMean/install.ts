import { weightedGeometricMean } from './index.js';

export type * from './types';

if (!Array.prototype.weightedGeometricMean) {
  Object.defineProperty(Array.prototype, 'weightedGeometricMean', {
    value(this: number[], weights: number[]): number {
      return weightedGeometricMean(this, weights);
    },
    writable: true,
    configurable: true,
  });
}
