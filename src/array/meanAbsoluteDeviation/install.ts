import { avg } from '../avg';

export * from './types';

export function installMeanAbsoluteDeviation() {
  if (!Array.prototype.meanAbsoluteDeviation) {
    Object.defineProperty(Array.prototype, 'meanAbsoluteDeviation', {
      value<T>(this: T[], fn: (val: T) => number): number {
        if (this.length === 0) return 0;
        const mean = avg(this, fn);
        let sum = 0;
        for (let i = 0; i < this.length; i++) {
          sum += Math.abs(fn(this[i]) - mean);
        }
        return sum / this.length;
      },
      writable: true,
      configurable: true,
    });
  }
}
