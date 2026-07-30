import { product } from './index.js';
export type * from './types';

if (!Array.prototype.product) {
  Object.defineProperty(Array.prototype, 'product', {
    value<T>(this: T[], fn: (val: T) => number): number {
      return product(this, fn);
    },
    writable: true,
    configurable: true,
  });
}
