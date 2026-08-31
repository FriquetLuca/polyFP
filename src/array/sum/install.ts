import { extendPrototype } from '../../utils.js';
import { sum } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  sum<T>(this: T[], fn: (val: T) => number): number {
    return sum(this, fn);
  },
});
