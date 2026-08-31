import { extendPrototype } from '../../utils.js';
import { variance } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  variance<T>(this: T[], fn: (val: T) => number): number {
    return variance(this, fn);
  },
});
