import { extendPrototype } from '../../utils.js';
import { or } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  or<T>(this: Function, ...preds: Array<(x: T) => boolean>) {
    return or(this as (x: T) => boolean, ...preds);
  },
});
