import { extendPrototype } from '../../utils.js';
import { groupBy } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  groupBy<T, K extends string | number | symbol>(
    this: T[],
    fn: (x: T) => K
  ): Record<K, T[]> {
    return groupBy(this, fn);
  },
});
