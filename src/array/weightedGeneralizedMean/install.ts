import { weightedGeneralizedMean } from './index';

export * from './types';

if (!Array.prototype.weightedGeneralizedMean) {
  Object.defineProperty(Array.prototype, 'weightedGeneralizedMean', {
    value(this: number[], weights: number[], p: number): number {
      return weightedGeneralizedMean(this, weights, p);
    },
    writable: true,
    configurable: true,
  });
}
