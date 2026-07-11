import { difference } from './index';
export * from './types';

if (!Array.prototype.difference) {
  Object.defineProperty(Array.prototype, 'difference', {
    value<T>(this: T[], b: T[]) {
      return difference(this, b);
    },
    writable: true,
    configurable: true,
  });
}
