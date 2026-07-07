import { variance } from '../variance';

export * from './types';

export function installStandardDeviation() {
  if (!Array.prototype.standardDeviation) {
    Object.defineProperty(Array.prototype, 'standardDeviation', {
      value<T>(this: T[], fn: (val: T) => number): number {
        return Math.sqrt(variance(this, fn));
      },
      writable: true,
      configurable: true,
    });
  }
}
