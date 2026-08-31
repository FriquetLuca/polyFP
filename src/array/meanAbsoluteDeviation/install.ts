import { extendPrototype } from '../../utils.js';
import { meanAbsoluteDeviation } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  meanAbsoluteDeviation<T>(this: T[], fn: (val: T) => number): number {
    return meanAbsoluteDeviation(this, fn);
  },
});
