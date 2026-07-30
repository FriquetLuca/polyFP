import { weightedMovingAverage } from './index.js';

export type * from './types';

if (!Array.prototype.weightedMovingAverage) {
  Object.defineProperty(Array.prototype, 'weightedMovingAverage', {
    value(this: number[], weights: number[], windowSize: number): number[] {
      return weightedMovingAverage(this, weights, windowSize);
    },
    writable: true,
    configurable: true,
  });
}
