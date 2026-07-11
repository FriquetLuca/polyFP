import { median } from './index';
export * from './types';

if (!Array.prototype.median) {
  Object.defineProperty(Array.prototype, 'median', {
    value<T>(this: T[], fn: (val: T) => number): number {
      return median(this, fn);
    },
    writable: true,
    configurable: true,
  });
}
