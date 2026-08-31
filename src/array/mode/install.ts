import { extendPrototype } from '../../utils.js';
import { mode } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  mode<T>(this: T[]) {
    return mode(this);
  },
});
