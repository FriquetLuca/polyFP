import { extendPrototype } from '../../utils.js';
import { trainCase } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  trainCase(this) {
    return trainCase(this as string);
  },
});
