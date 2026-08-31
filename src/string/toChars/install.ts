import { extendPrototype } from '../../utils.js';
import { toChars } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  toChars(this) {
    return toChars(this as string);
  },
});
