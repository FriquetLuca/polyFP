import type { AnyFunction } from '../../types';
import { extendPrototype } from '../../utils.js';
import { before } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  before(this, n: number) {
    return before(this as AnyFunction, n);
  },
});
