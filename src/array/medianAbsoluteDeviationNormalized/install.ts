import { medianAbsoluteDeviation } from '../medianAbsoluteDeviation';

export * from './types';

if (!Array.prototype.medianAbsoluteDeviationNormalized) {
  Object.defineProperty(Array.prototype, 'medianAbsoluteDeviationNormalized', {
    value<T>(this: T[], fn: (val: T) => number): number {
      return medianAbsoluteDeviation(this, fn) * 1.4826;
    },
    writable: true,
    configurable: true,
  });
}
