import { extendPrototype } from '../../utils.js';
import { noCase } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  noCase(this) {
    return noCase(this as string);
  },
});
