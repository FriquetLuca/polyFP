import { forItems } from './index';
export * from './types';

if (!Array.prototype.forItems) {
  Object.defineProperty(Array.prototype, 'forItems', {
    value<T>(
      this: T[],
      cb: (item: T, index: number, array: T[]) => 'break' | void
    ) {
      forItems(this, cb);
    },
    writable: true,
    configurable: true,
  });
}
