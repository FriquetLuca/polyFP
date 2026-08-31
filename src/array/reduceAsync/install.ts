import { extendPrototype } from '../../utils.js';
import { reduceAsync } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  reduceAsync<T, Acc>(
    this: T[],
    fn: (acc: Acc, item: T, index: number) => Promise<Acc>,
    initial: Acc
  ) {
    return reduceAsync(this, fn, initial);
  },
});
