import { extendPrototype } from '../../utils.js';
import { avgAbsDevAroundMedian } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  avgAbsDevAroundMedian<T>(this: T[], fn: (val: T) => number): number {
    return avgAbsDevAroundMedian(this, fn);
  },
});
