import { min } from './index.js';
export type * from './types';

if (!Array.prototype.min) {
  Object.defineProperty(Array.prototype, 'min', {
    value<T>(this: T[], fn: (val: T) => number): number {
      return min(this, fn);
    },
    writable: true,
    configurable: true,
  });
}
