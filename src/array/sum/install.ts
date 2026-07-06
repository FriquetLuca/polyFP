export * from './types';

export function installSum() {
  if (!Array.prototype.sum) {
    Object.defineProperty(Array.prototype, 'sum', {
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
