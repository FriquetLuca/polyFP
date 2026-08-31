import { extendPrototype } from '../../utils.js';
import { isBlank } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  isBlank(this) {
    return isBlank(this as string);
  },
});
