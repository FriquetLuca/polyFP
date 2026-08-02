import { xor } from './index.js';
export type * from './types';

if (!Array.prototype.xor) {
  Object.defineProperty(Array.prototype, 'xor', {
    value<T>(this: T[], b: T[]) {
      return xor(this, b);
    },
    writable: true,
    configurable: true,
  });
}
