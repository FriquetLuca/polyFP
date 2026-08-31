import { extendPrototype } from '../../utils.js';
import { standardDeviation } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  standardDeviation<T>(this: T[], fn: (val: T) => number): number {
    return standardDeviation(this, fn);
  },
});
