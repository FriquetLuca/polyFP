import { extendPrototype } from '../../utils.js';
import { camelCase } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  camelCase(this) {
    return camelCase(this as string);
  },
});
