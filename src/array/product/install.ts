export * from './types';

export function installProduct() {
  if (!Array.prototype.product) {
    Object.defineProperty(Array.prototype, 'product', {
      value<T>(this: T[], fn: (val: T) => number): number {
        return this.reduce(
          (prev: number, current: T): number => prev * fn(current),
          1
        );
      },
      writable: true,
      configurable: true,
    });
  }
}
