import { extendPrototype } from '../../utils.js';
import { andThen } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  andThen(this: Function) {
    return andThen(this as (a: {}) => unknown);
  },
});
