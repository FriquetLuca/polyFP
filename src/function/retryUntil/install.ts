import { extendPrototype } from '../../utils.js';
import { retryUntil, type RetryUntilOptions } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  retryUntil<T, Args extends unknown[]>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    this: Function,
    predicate: (result: T) => boolean,
    options: RetryUntilOptions = {}
  ) {
    return retryUntil(
      this as (...args: Args) => Promise<T>,
      predicate,
      options
    );
  },
});
