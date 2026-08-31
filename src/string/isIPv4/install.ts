import { extendPrototype } from '../../utils.js';
import { isIPv4 } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  isIPv4(this) {
    return isIPv4(this as string);
  },
});
