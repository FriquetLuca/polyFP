export * from './types';

export function installForItems() {
  if (!Array.prototype.forItems) {
    Object.defineProperty(Array.prototype, 'forItems', {
      value<T>(
        this: T[],
        cb: (item: T, index: number, array: T[]) => 'break' | void
      ) {
        for (let i = 0; i < this.length; i++) {
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
