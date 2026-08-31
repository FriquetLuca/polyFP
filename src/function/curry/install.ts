import { extendPrototype } from '../../utils.js';
import { curry } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  curry(this: Function) {
    return curry(this as (...args: unknown[]) => unknown);
  },
});
