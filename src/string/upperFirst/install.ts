import { extendPrototype } from '../../utils.js';
import { upperFirst } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  upperFirst(this) {
    return upperFirst(this as string);
  },
});
