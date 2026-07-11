import { forItemsReverse } from './index';
export * from './types';

if (!Array.prototype.forItemsReverse) {
  Object.defineProperty(Array.prototype, 'forItemsReverse', {
    value<T>(
      this: T[],
      cb: (item: T, index: number, array: T[]) => 'break' | void
    ) {
      forItemsReverse(this, cb);
    },
    writable: true,
    configurable: true,
  });
}
