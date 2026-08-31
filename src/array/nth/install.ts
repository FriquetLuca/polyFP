import { extendPrototype } from '../../utils.js';
import { nth } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  nth<T>(this: T[], pos: number) {
    return nth(this, pos);
  },
});
