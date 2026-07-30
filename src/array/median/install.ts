import { median } from './index.js';
export type * from './types';

if (!Array.prototype.median) {
  Object.defineProperty(Array.prototype, 'median', {
    value<T>(this: T[], fn: (val: T) => number): number {
      return median(this, fn);
    },
    writable: true,
    configurable: true,
  });
}
