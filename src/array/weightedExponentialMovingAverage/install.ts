import { weightedExponentialMovingAverage } from './index';

export * from './types';

export function installWeightedExponentialMovingAverage() {
  if (!Array.prototype.weightedExponentialMovingAverage) {
    Object.defineProperty(Array.prototype, 'weightedExponentialMovingAverage', {
      value<T>(this: T[], fn: (val: T) => number, alpha: number): number[] {
        return weightedExponentialMovingAverage(this, fn, alpha);
      },
      writable: true,
      configurable: true,
    });
  }
}
