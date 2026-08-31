import { extendPrototype } from '../../utils.js';
import { debounce } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  debounce(this: Function, waitMs: number) {
    return debounce(this as (...args: unknown[]) => unknown, waitMs);
  },
});
