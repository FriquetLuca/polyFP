import { extendPrototype } from '../../utils.js';
import { retry } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  retry<T, Args extends unknown[]>(this: Function, attempts: number) {
    return retry(this as (...args: Args) => Promise<T>, attempts);
  },
});
