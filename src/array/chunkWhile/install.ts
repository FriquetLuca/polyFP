import { chunkWhile } from './index.js';

export type * from './types';

if (!Array.prototype.chunkWhile) {
  Object.defineProperty(Array.prototype, 'chunkWhile', {
    value<T>(
      this: T[],
      predicate: (previous: T, current: T) => boolean
    ): T[][] {
      return chunkWhile(this, predicate);
    },
    writable: true,
    configurable: true,
  });
}
