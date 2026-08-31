import { extendPrototype } from '../../utils.js';
import { max } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  max<T>(this: T[], fn: (val: T) => number): number {
    return max(this, fn);
  },
});
