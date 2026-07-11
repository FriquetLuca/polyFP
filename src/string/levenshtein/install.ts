import { levenshtein } from './index';
import './types';

if (!String.prototype.levenshtein) {
  Object.defineProperty(String.prototype, 'levenshtein', {
    value(this: string, b: string) {
      return levenshtein(this, b);
    },
    writable: true,
    configurable: true,
  });
}
