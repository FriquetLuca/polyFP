import { extendPrototype } from '../../utils.js';
import { kebabCase } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  kebabCase(this) {
    return kebabCase(this as string);
  },
});
