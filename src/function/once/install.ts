import { extendPrototype } from '../../utils.js';
import { once } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  once<Args extends unknown[], T>(this: Function) {
    return once(this as (...args: Args) => T);
  },
});
