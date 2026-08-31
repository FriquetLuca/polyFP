import { extendPrototype } from '../../utils.js';
import { jaro } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  jaro(this, b: string) {
    return jaro(this as string, b);
  },
});
