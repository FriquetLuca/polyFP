import { extendPrototype } from '../../utils.js';
import { medianAbsoluteDeviation } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  medianAbsoluteDeviation<T>(this: T[], fn: (val: T) => number): number {
    return medianAbsoluteDeviation(this, fn);
  },
});
