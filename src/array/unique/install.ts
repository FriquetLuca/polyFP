import { extendPrototype } from '../../utils.js';
import { unique } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  unique<T>(this: T[]): T[] {
    return unique(this);
  },
});
