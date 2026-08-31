import { extendPrototype } from '../../utils.js';
import { dotCase } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  dotCase(this) {
    return dotCase(this as string);
  },
});
