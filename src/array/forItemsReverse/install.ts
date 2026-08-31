import { extendPrototype } from '../../utils.js';
import { forItemsReverse } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  forItemsReverse<T>(
    this: T[],
    cb: (item: T, index: number, array: T[]) => 'break' | void
  ) {
    forItemsReverse(this, cb);
  },
});
