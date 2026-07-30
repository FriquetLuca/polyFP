import { geometricMean } from './index.js';
export type * from './types';

if (!Array.prototype.geometricMean) {
  Object.defineProperty(Array.prototype, 'geometricMean', {
    value<T>(this: T[], fn: (val: T) => number): number {
      return geometricMean(this, fn);
    },
    writable: true,
    configurable: true,
  });
}
