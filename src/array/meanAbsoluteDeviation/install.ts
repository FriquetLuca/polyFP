import { meanAbsoluteDeviation } from './index.js';

export type * from './types';

if (!Array.prototype.meanAbsoluteDeviation) {
  Object.defineProperty(Array.prototype, 'meanAbsoluteDeviation', {
    value<T>(this: T[], fn: (val: T) => number): number {
      return meanAbsoluteDeviation(this, fn);
    },
    writable: true,
    configurable: true,
  });
}
