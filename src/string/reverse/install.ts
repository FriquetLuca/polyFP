import { extendPrototype } from '../../utils.js';
import { reverse } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  reverse(this) {
    return reverse(this as string);
  },
});
