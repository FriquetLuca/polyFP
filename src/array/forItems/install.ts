import { extendPrototype } from '../../utils.js';
import { forItems } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  forItems<T>(
    this: T[],
    cb: (item: T, index: number, array: T[]) => 'break' | void
  ) {
    forItems(this, cb);
  },
});
