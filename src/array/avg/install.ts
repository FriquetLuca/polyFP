import { extendPrototype } from '../../utils.js';
import { avg } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  avg<T>(this: T[], fn: (val: T) => number): number {
    return avg(this, fn);
  },
});
