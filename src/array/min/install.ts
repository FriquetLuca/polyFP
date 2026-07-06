export * from './types';

export function installMin() {
  if (!Array.prototype.min) {
    Object.defineProperty(Array.prototype, 'min', {
      value<T>(this: T[], fn: (val: T) => number): number {
        return this.length === 0
          ? 0
          : this.reduce(
              (prev: number, current: T): number => Math.min(prev, fn(current)),
              Number.POSITIVE_INFINITY
            );
      },
      writable: true,
      configurable: true,
    });
  }
}
