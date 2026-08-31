import { extendPrototype } from '../../utils.js';
import { rootMeanSquare } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  rootMeanSquare<T>(this: T[], fn: (val: T) => number): number {
    return rootMeanSquare(this, fn);
  },
});
