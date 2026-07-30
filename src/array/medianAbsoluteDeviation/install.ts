import { medianAbsoluteDeviation } from './index.js';

export type * from './types';

if (!Array.prototype.medianAbsoluteDeviation) {
  Object.defineProperty(Array.prototype, 'medianAbsoluteDeviation', {
    value<T>(this: T[], fn: (val: T) => number): number {
      return medianAbsoluteDeviation(this, fn);
    },
    writable: true,
    configurable: true,
  });
}
