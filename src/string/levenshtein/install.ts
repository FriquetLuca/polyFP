import { extendPrototype } from '../../utils.js';
import { levenshtein } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  levenshtein(this, b: string) {
    return levenshtein(this as string, b);
  },
});
