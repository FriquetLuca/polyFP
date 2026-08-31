import { extendPrototype } from '../../utils.js';
import { xor } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  xor<T>(this: T[], b: T[]) {
    return xor(this, b);
  },
});
