import { sum } from './index';
export * from './types';

if (!Array.prototype.sum) {
  Object.defineProperty(Array.prototype, 'sum', {
    value<T>(this: T[], fn: (val: T) => number): number {
      return sum(this, fn);
    },
    writable: true,
    configurable: true,
  });
}
