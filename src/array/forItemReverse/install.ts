export * from './types';

export function installForItemsReverse() {
  if (!Array.prototype.forItemsReverse) {
    Object.defineProperty(Array.prototype, 'forItemsReverse', {
      value<T>(
        this: T[],
        cb: (item: T, index: number, array: T[]) => 'break' | void
      ) {
        for (let i = this.length - 1; i >= 0; i--) {
          if (cb(this[i], i, this) === 'break') {
            break;
          }
        }
      },
      writable: true,
      configurable: true,
    });
  }
}
