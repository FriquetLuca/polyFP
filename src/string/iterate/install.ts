import { extendPrototype } from '../../utils.js';
import { iterate } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  iterate(this) {
    return iterate(this as string);
  },
});
