import { generalizedMean } from './index';

export * from './types';

if (!Array.prototype.generalizedMean) {
  Object.defineProperty(Array.prototype, 'generalizedMean', {
    value<T>(this: T[], fn: (val: T) => number, p: number): number {
      return generalizedMean(this, fn, p);
    },
    writable: true,
    configurable: true,
  });
}
