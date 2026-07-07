export * from './types';

export function installMedian() {
  if (!Array.prototype.median) {
    Object.defineProperty(Array.prototype, 'median', {
      value<T>(this: T[], fn: (val: T) => number): number {
        if (this.length === 0) return 0;
        const sorted = this.map(fn).sort((a, b) => a - b);
        const mid = sorted.length >> 1;
        if ((sorted.length & 1) === 0)
          return (sorted[mid - 1] + sorted[mid]) / 2;
        return sorted[mid];
      },
      writable: true,
      configurable: true,
    });
  }
}
