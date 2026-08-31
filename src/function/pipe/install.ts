import type { AnyFunction } from '../../types';
import { extendPrototype } from '../../utils.js';
import { pipe } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  pipe(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    this: Function,
    ...fns: AnyFunction[]
  ): (arg: unknown) => unknown {
    return pipe(this as AnyFunction, ...fns);
  },
});
