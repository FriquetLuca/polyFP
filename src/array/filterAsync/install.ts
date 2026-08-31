import { extendPrototype } from '../../utils.js';
import { filterAsync } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  filterAsync<T>(
    this: T[],
    predicate: (item: T, index: number) => Promise<boolean>,
    concurrency?: number
  ) {
    filterAsync(this, predicate, concurrency);
  },
});
