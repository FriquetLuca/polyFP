import { weightedRootMeanSquare } from './index';

export * from './types';

export function installWeightedRootMeanSquare() {
  if (!Array.prototype.weightedRootMeanSquare) {
    Object.defineProperty(Array.prototype, 'weightedRootMeanSquare', {
      value(this: number[], weights: number[]): number {
        return weightedRootMeanSquare(this, weights);
      },
      writable: true,
      configurable: true,
    });
  }
}
