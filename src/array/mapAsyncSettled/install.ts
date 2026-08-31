import { extendPrototype } from '../../utils.js';
import { mapAsyncSettled } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  mapAsyncSettled<T, R>(
    this: T[],
    fn: (item: T, index: number) => Promise<R>,
    concurrency?: number
  ) {
    return mapAsyncSettled(this, fn, concurrency);
  },
});
