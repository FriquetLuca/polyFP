import { difference } from './index.js';
export type * from './types';

if (!Array.prototype.difference) {
  Object.defineProperty(Array.prototype, 'difference', {
    value<T>(this: T[], b: T[]) {
      return difference(this, b);
    },
    writable: true,
    configurable: true,
  });
}
