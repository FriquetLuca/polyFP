import { extendPrototype } from '../../utils.js';
import { isIPv6 } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  isIPv6(this, strict?: boolean) {
    return isIPv6(this as string, strict);
  },
});
