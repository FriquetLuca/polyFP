import { extendPrototype } from '../../utils.js';
import { wrap } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  wrap<Args extends unknown[], Res, WrapArgs extends unknown[], Result>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    this: Function,
    wrapper: (fn: (...args: Args) => Res, ...wrapArgs: WrapArgs) => Result
  ) {
    return wrap(this as (...args: Args) => Res, wrapper);
  },
});
