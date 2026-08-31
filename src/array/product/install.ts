import { extendPrototype } from '../../utils.js';
import { product } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  product<T>(this: T[], fn: (val: T) => number): number {
    return product(this, fn);
  },
});
