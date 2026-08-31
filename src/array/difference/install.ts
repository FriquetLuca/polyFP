import { extendPrototype } from '../../utils.js';
import { difference } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  difference<T>(this: T[], b: T[]) {
    return difference(this, b);
  },
});
