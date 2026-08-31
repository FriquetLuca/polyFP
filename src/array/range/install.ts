import { extendPrototype } from '../../utils.js';
import { range } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  range<T>(this: T[], mapper: (item: T) => number): number {
    return range(this, mapper);
  },
});
