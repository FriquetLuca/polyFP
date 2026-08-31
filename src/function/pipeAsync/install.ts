import type { AnyAsyncFunction } from '../../types.js';
import { extendPrototype } from '../../utils.js';
import { pipeAsync } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  pipeAsync(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    this: Function,
    ...fns: AnyAsyncFunction[]
  ): (arg: unknown) => unknown {
    return pipeAsync(this as AnyAsyncFunction, ...fns);
  },
});
