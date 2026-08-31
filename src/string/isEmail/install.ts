import { extendPrototype } from '../../utils.js';
import { isEmail } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  isEmail(this) {
    return isEmail(this as string);
  },
});
