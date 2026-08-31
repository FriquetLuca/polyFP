import { extendPrototype } from '../../utils.js';
import { guardAsync } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  guardAsync<T, Args extends unknown[]>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    this: Function,
    fallback: T
  ): (...args: Args) => Promise<T> {
    return guardAsync(this as (...args: Args) => Promise<T>, fallback);
  },
});
