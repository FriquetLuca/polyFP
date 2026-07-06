export * from './types';

export function installAvg() {
  if (!Array.prototype.avg) {
    Object.defineProperty(Array.prototype, 'avg', {
      value<T>(this: T[], fn: (val: T) => number): number {
        return this.length === 0
          ? 0
          : this.reduce(
              (prev: number, current: T): number => prev + fn(current),
              0
            ) / this.length;
      },
      writable: true,
      configurable: true,
    });
  }
}
