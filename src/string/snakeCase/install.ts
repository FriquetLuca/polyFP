import { extendPrototype } from '../../utils.js';
import { snakeCase } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  snakeCase(this) {
    return snakeCase(this as string);
  },
});
