import { extendPrototype } from '../../utils.js';
import { forEachAsync } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  forEachAsync<T>(
    this: T[],
    fn: (item: T, index: number) => Promise<void>,
    concurrency?: number
  ) {
    forEachAsync(this, fn, concurrency);
  },
});
