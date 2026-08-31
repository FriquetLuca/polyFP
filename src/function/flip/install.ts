import type { AnyFunction } from '../../types.js';
import { extendPrototype } from '../../utils.js';
import { flip } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  flip(this) {
    return flip(this as AnyFunction);
  },
});
