import { avg } from './index';

export * from './types';

if (!Array.prototype.avg) {
  Object.defineProperty(Array.prototype, 'avg', {
    value<T>(this: T[], fn: (val: T) => number): number {
      return avg(this, fn);
    },
    writable: true,
    configurable: true,
  });
}
