import type { AnyFunction } from '../../types.js';
import { extendPrototype } from '../../utils.js';
import { uncurry } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  uncurry(this: Function) {
    return uncurry(this as AnyFunction);
  },
});
