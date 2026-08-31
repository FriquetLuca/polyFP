import { extendPrototype } from '../../utils.js';
import { generalizedMean } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  generalizedMean<T>(this: T[], fn: (val: T) => number, p: number): number {
    return generalizedMean(this, fn, p);
  },
});
