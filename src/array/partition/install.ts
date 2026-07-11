import { partition } from './index';
export * from './types';

if (!Array.prototype.partition) {
  Object.defineProperty(Array.prototype, 'partition', {
    value<T>(this: T[], pred: (x: T) => boolean): [T[], T[]] {
      return partition(this, pred);
    },
    writable: true,
    configurable: true,
  });
}
