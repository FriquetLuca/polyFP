export * from './types';

export function installMax() {
  if (!Array.prototype.max) {
    Object.defineProperty(Array.prototype, 'max', {
      value<T>(this: T[], fn: (val: T) => number): number {
        return this.length === 0
          ? 0
          : this.reduce(
              (prev: number, current: T): number => Math.max(prev, fn(current)),
              Number.NEGATIVE_INFINITY
            );
      },
      writable: true,
      configurable: true,
    });
  }
}
