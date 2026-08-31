import { extendPrototype } from '../../utils.js';
import { zip } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  zip<A, B>(this: A[], bs: B[]): [A, B][] {
    return zip(this, bs);
  },
});
