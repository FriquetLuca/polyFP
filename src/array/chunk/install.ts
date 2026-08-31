import { extendPrototype } from '../../utils.js';
import { chunk } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  chunk<T>(this: T[], size: number): T[][] {
    return chunk(this, size);
  },
});
