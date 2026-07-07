import { weightedNormalizedMean } from './index';

export * from './types';

export function installWeightedNormalizedMean() {
  if (!Array.prototype.weightedNormalizedMean) {
    Object.defineProperty(Array.prototype, 'weightedNormalizedMean', {
      value(this: number[], weights: number[]): number {
        return weightedNormalizedMean(this, weights);
      },
      writable: true,
      configurable: true,
    });
  }
}
