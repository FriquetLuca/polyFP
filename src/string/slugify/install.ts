import { extendPrototype } from '../../utils.js';
import { slugify } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  slugify(this) {
    return slugify(this as string);
  },
});
