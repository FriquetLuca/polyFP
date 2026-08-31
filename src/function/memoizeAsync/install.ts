import { extendPrototype } from '../../utils.js';
import { memoizeAsync, type MemoizeAsyncOptions } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  memoizeAsync<Args extends unknown[], T>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    this: Function,
    options: MemoizeAsyncOptions<Args> = {}
  ) {
    return memoizeAsync(this as (...args: Args) => Promise<T>, options);
  },
});
