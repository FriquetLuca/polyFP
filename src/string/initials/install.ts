import { extendPrototype } from '../../utils.js';
import { initials } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  initials(this) {
    return initials(this as string);
  },
});
