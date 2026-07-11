import { cumulativeAverage } from './index';
export * from './types';

if (!Array.prototype.cumulativeAverage) {
  Object.defineProperty(Array.prototype, 'cumulativeAverage', {
    value<T>(this: T[], fn: (val: T) => number): number[] {
      return cumulativeAverage(this, fn);
    },
    writable: true,
    configurable: true,
  });
}
