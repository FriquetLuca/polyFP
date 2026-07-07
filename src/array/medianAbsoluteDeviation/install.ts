import { median } from '../median';

export * from './types';

export function installMedianAbsoluteDeviation() {
  if (!Array.prototype.medianAbsoluteDeviation) {
    Object.defineProperty(Array.prototype, 'medianAbsoluteDeviation', {
      value<T>(this: T[], fn: (val: T) => number): number {
        if (this.length === 0) return 0;
        const med = median(this, fn);
        const deviations = new Array<number>(this.length);
        for (let i = 0; i < this.length; i++) {
          deviations[i] = Math.abs(fn(this[i]) - med);
        }
        return median(deviations, (v) => v);
      },
      writable: true,
      configurable: true,
    });
  }
}
