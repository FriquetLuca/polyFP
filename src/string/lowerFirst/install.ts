import { extendPrototype } from '../../utils.js';
import { lowerFirst } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  lowerFirst(this) {
    return lowerFirst(this as string);
  },
});
