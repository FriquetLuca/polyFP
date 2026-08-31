import { extendPrototype } from '../../utils.js';
import { pluck } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  pluck<T, K extends keyof T>(this: T[], key: K): T[K][] {
    return pluck(this, key);
  },
});
