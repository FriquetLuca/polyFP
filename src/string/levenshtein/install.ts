import { levenshtein } from './index.js';
export type * from './types';

if (!String.prototype.levenshtein) {
  Object.defineProperty(String.prototype, 'levenshtein', {
    value(this: string, b: string) {
      return levenshtein(this, b);
    },
    writable: true,
    configurable: true,
  });
}
