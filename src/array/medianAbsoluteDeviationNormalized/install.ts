import { extendPrototype } from '../../utils.js';
import { medianAbsoluteDeviationNormalized } from '../index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  medianAbsoluteDeviationNormalized<T>(
    this: T[],
    fn: (val: T) => number
  ): number {
    return medianAbsoluteDeviationNormalized(this, fn);
  },
});
