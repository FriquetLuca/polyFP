import { extendPrototype } from '../../utils.js';
import { swapCase } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  swapCase(this) {
    return swapCase(this as string);
  },
});
