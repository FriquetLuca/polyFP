import { exponentialMovingAverage } from './index';
export * from './types';

if (!Array.prototype.exponentialMovingAverage) {
  Object.defineProperty(Array.prototype, 'exponentialMovingAverage', {
    value<T>(this: T[], fn: (val: T) => number, alpha: number): number[] {
      return exponentialMovingAverage(this, fn, alpha);
    },
    writable: true,
    configurable: true,
  });
}
