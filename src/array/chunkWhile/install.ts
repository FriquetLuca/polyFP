import { extendPrototype } from '../../utils.js';
import { chunkWhile } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  chunkWhile<T>(
    this: T[],
    predicate: (previous: T, current: T) => boolean
  ): T[][] {
    return chunkWhile(this, predicate);
  },
});
