import { median } from '../median';

export * from './types';

export function installAvgAbsDevAroundMedian() {
  if (!Array.prototype.avgAbsDevAroundMedian) {
    Object.defineProperty(Array.prototype, 'avgAbsDevAroundMedian', {
      value<T>(this: T[], fn: (val: T) => number): number {
        if (this.length === 0) return 0;
        const med = median(this, fn);
        return (
          this.reduce((p, c) => p + Math.abs(fn(c) - med), 0) / this.length
        );
      },
      writable: true,
      configurable: true,
    });
  }
}
