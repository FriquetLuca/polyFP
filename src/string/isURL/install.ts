import { extendPrototype } from '../../utils.js';
import { isURL } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  isURL(this) {
    return isURL(this as string);
  },
});
