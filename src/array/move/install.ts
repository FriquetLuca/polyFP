import { extendPrototype } from '../../utils.js';
import { move } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  move<T>(this: T[], from: number, to: number): T[] {
    return move(this, from, to);
  },
});
