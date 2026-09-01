import { extendPrototype } from '../../utils.js';
import { andThen } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  andThen(this: Function) {
    return andThen(this as (a: unknown) => unknown);
  },
});
