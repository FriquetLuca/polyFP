import { extendPrototype } from '../../utils.js';
import { shuffle } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  shuffle<T>(this: T[]): T[] {
    return shuffle(this);
  },
});
