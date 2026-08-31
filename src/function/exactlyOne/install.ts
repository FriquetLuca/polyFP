import { extendPrototype } from '../../utils.js';
import { exactlyOne } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  exactlyOne<T>(this: Function, ...preds: ((x: T) => boolean)[]) {
    return exactlyOne(this as (x: T) => boolean, ...preds);
  },
});
