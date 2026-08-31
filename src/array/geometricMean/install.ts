import { extendPrototype } from '../../utils.js';
import { geometricMean } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  geometricMean<T>(this: T[], fn: (val: T) => number): number {
    return geometricMean(this, fn);
  },
});
