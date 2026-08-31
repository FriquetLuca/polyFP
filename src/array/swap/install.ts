import { extendPrototype } from '../../utils.js';
import { swap } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  swap<T>(this: T[], a: number, b: number): T[] {
    return swap(this, a, b);
  },
});
