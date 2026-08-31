import { extendPrototype } from '../../utils.js';
import { partial } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  partial(this: Function, ...boundArgs: unknown[]) {
    return partial(this as (...args: unknown[]) => unknown, ...boundArgs);
  },
});
