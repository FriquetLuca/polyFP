import { countBy } from './index';
export * from './types';

if (!Array.prototype.countBy) {
  Object.defineProperty(Array.prototype, 'countBy', {
    value<T, K extends PropertyKey>(
      array: T[],
      selector: (item: T) => K
    ): Record<K, number> {
      return countBy(array, selector);
    },
    writable: true,
    configurable: true,
  });
}
