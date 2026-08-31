import { extendPrototype } from '../../utils.js';
import { min } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  min<T>(this: T[], fn: (val: T) => number): number {
    return min(this, fn);
  },
});
