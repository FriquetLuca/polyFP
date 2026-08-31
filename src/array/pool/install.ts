import { extendPrototype } from '../../utils.js';
import { pool } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  pool<T>(this: T[]) {
    return pool(this);
  },
});
