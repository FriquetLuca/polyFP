import { extendPrototype } from '../../utils.js';
import { cumulativeAverage } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  cumulativeAverage<T>(this: T[], fn: (val: T) => number): number[] {
    return cumulativeAverage(this, fn);
  },
});
