import { medianAbsoluteDeviationNormalized } from '../index.js';

export type * from './types';

if (!Array.prototype.medianAbsoluteDeviationNormalized) {
  Object.defineProperty(Array.prototype, 'medianAbsoluteDeviationNormalized', {
    value<T>(this: T[], fn: (val: T) => number): number {
      return medianAbsoluteDeviationNormalized(this, fn);
    },
    writable: true,
    configurable: true,
  });
}
