import { weightedArithmeticMean } from './index';

export * from './types';

export function installWeightedArithmeticMean() {
  if (!Array.prototype.weightedArithmeticMean) {
    Object.defineProperty(Array.prototype, 'weightedArithmeticMean', {
      value(this: number[], weights: number[]): number {
        return weightedArithmeticMean(this, weights);
      },
      writable: true,
      configurable: true,
    });
  }
}
