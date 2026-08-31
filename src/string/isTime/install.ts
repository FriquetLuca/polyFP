import { extendPrototype } from '../../utils.js';
import { isTime } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  isTime(this) {
    return isTime(this as string);
  },
});
