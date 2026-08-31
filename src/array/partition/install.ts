import { extendPrototype } from '../../utils.js';
import { partition } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  partition<T>(this: T[], pred: (x: T) => boolean): [T[], T[]] {
    return partition(this, pred);
  },
});
