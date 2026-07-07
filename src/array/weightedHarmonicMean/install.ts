import { weightedHarmonicMean } from './index';

export * from './types';

export function installWeightedHarmonicMean() {
  if (!Array.prototype.weightedHarmonicMean) {
    Object.defineProperty(Array.prototype, 'weightedHarmonicMean', {
      value(this: number[], weights: number[]): number {
        return weightedHarmonicMean(this, weights);
      },
      writable: true,
      configurable: true,
    });
  }
}
