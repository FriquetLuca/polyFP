import { extendPrototype } from '../../utils.js';
import { filterMap } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  filterMap<T, U>(
    this: T[],
    mapper: (value: T, index: number, array: T[]) => U | null | undefined
  ) {
    filterMap(this, mapper);
  },
});
