import { extendPrototype } from '../../utils.js';
import { moduleCase } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  moduleCase(this) {
    return moduleCase(this as string);
  },
});
