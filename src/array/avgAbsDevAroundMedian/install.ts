import { avgAbsDevAroundMedian } from './index';

export * from './types';

if (!Array.prototype.avgAbsDevAroundMedian) {
  Object.defineProperty(Array.prototype, 'avgAbsDevAroundMedian', {
    value<T>(this: T[], fn: (val: T) => number): number {
      return avgAbsDevAroundMedian(this, fn);
    },
    writable: true,
    configurable: true,
  });
}
