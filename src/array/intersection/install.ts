import { extendPrototype } from '../../utils.js';
import { intersection } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  intersection<T>(this: T[], b: T[]) {
    return intersection(this, b);
  },
});
