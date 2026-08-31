import { extendPrototype } from '../../utils.js';
import { not } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  not<T>(this: Function) {
    return not(this as (x: T) => boolean);
  },
});
