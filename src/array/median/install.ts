import { extendPrototype } from '../../utils.js';
import { median } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  median<T>(this: T[], fn: (val: T) => number): number {
    return median(this, fn);
  },
});
