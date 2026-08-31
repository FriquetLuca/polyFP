import type { AnyFunction } from '../../types';
import { extendPrototype } from '../../utils.js';
import { unary } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  unary(this: Function) {
    return unary(this as AnyFunction);
  },
});
