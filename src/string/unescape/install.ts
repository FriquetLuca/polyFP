import { extendPrototype } from '../../utils.js';
import { unescape } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  unescape(this) {
    return unescape(this as string);
  },
});
