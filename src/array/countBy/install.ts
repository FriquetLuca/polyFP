import { countBy } from './index.js';
export type * from './types';

if (!Array.prototype.countBy) {
  Object.defineProperty(Array.prototype, 'countBy', {
    value<T, K extends PropertyKey>(
      this: T[],
      selector: (item: T) => K
    ): Record<K, number> {
      return countBy(this, selector);
    },
    writable: true,
    configurable: true,
  });
}
