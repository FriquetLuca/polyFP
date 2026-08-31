import { extendPrototype } from '../../utils.js';
import { guard } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  guard<T, Args extends unknown[]>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    this: Function,
    fallback: T
  ): (...args: Args) => T {
    return guard(this as (...args: Args) => T, fallback);
  },
});
