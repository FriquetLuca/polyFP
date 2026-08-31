import { extendPrototype } from '../../utils.js';
import { harmonicMean } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  harmonicMean<T>(this: T[], fn: (val: T) => number): number {
    return harmonicMean(this, fn);
  },
});
