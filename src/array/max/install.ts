import { max } from './index.js';
export type * from './types';

if (!Array.prototype.max) {
  Object.defineProperty(Array.prototype, 'max', {
    value<T>(this: T[], fn: (val: T) => number): number {
      return max(this, fn);
    },
    writable: true,
    configurable: true,
  });
}
