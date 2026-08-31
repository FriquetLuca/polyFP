import { extendPrototype } from '../../utils.js';
import { memoize, type MemoizeOptions } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  memoize<Args extends unknown[], T>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    this: Function,
    options: MemoizeOptions<Args> = {}
  ) {
    return memoize(this as (...args: Args) => T, options);
  },
});
