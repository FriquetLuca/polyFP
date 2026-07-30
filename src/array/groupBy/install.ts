import { groupBy } from './index.js';
export type * from './types';

if (!Array.prototype.groupBy) {
  Object.defineProperty(Array.prototype, 'groupBy', {
    value<T, K extends string | number | symbol>(
      this: T[],
      fn: (x: T) => K
    ): Record<K, T[]> {
      return groupBy(this, fn);
    },
    writable: true,
    configurable: true,
  });
}
