import { simpleMovingAverage } from './index';
export * from './types';

if (!Array.prototype.simpleMovingAverage) {
  Object.defineProperty(Array.prototype, 'simpleMovingAverage', {
    value<T>(this: T[], fn: (val: T) => number, windowSize: number): number[] {
      return simpleMovingAverage(this, fn, windowSize);
    },
    writable: true,
    configurable: true,
  });
}
