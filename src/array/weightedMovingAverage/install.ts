import { weightedMovingAverage } from './index';

export * from './types';

export function installWeightedMovingAverage() {
  if (!Array.prototype.weightedMovingAverage) {
    Object.defineProperty(Array.prototype, 'weightedMovingAverage', {
      value(this: number[], weights: number[], windowSize: number): number[] {
        return weightedMovingAverage(this, weights, windowSize);
      },
      writable: true,
      configurable: true,
    });
  }
}
