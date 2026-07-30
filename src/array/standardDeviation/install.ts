import { standardDeviation } from './index.js';
export type * from './types';

if (!Array.prototype.standardDeviation) {
  Object.defineProperty(Array.prototype, 'standardDeviation', {
    value<T>(this: T[], fn: (val: T) => number): number {
      return standardDeviation(this, fn);
    },
    writable: true,
    configurable: true,
  });
}
