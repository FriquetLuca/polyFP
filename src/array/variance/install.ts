import { avg } from '../avg';

export * from './types';

export function installVariance() {
  if (!Array.prototype.variance) {
    Object.defineProperty(Array.prototype, 'variance', {
      value<T>(this: T[], fn: (val: T) => number): number {
        if (this.length === 0) return 0;
        const mean = avg(this, fn);
        let sum = 0;
        for (let i = 0; i < this.length; i++) {
          const d = fn(this[i]) - mean;
          sum += d * d;
        }
        return sum / this.length;
      },
      writable: true,
      configurable: true,
    });
  }
}
