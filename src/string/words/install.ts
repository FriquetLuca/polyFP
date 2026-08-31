import { extendPrototype } from '../../utils.js';
import { words } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  words(this) {
    return words(this as string);
  },
});
