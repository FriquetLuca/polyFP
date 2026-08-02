import { nth } from './index.js';

export type * from './types';

if (!Array.prototype.nth) {
  Object.defineProperty(Array.prototype, 'nth', {
    value<T>(this: T[], pos: number) {
      return nth(this, pos);
    },
    writable: true,
    configurable: true,
  });
}
