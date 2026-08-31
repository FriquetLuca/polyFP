import { extendPrototype } from '../../utils.js';
import { mapAsync } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  mapAsync<T, R>(
    this: T[],
    fn: (item: T, index: number) => Promise<R>,
    concurrency?: number
  ) {
    return mapAsync(this, fn, concurrency);
  },
});
