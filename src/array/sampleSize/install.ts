import { extendPrototype } from '../../utils.js';
import { sampleSize } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  sampleSize<T>(this: T[], size: number): T[] {
    return sampleSize(this, size);
  },
});
