import { extendPrototype } from '../../utils.js';
import { hamming } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  hamming(this, b: string) {
    return hamming(this as string, b);
  },
});
