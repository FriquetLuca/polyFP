import type { MemoizeOptions } from '../../types';
import { extendPrototype } from '../../utils.js';
import { memoizeAsync } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  memoizeAsync<Args extends unknown[], T>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    this: Function,
    options: MemoizeOptions<Args> = {}
  ) {
    return memoizeAsync(this as (...args: Args) => Promise<T>, options);
  },
});
