import { variance } from './index.js';
export type * from './types';

if (!Array.prototype.variance) {
  Object.defineProperty(Array.prototype, 'variance', {
    value<T>(this: T[], fn: (val: T) => number): number {
      return variance(this, fn);
    },
    writable: true,
    configurable: true,
  });
}
