import { extendPrototype } from '../../utils.js';
import { constantCase } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  constantCase(this) {
    return constantCase(this as string);
  },
});
