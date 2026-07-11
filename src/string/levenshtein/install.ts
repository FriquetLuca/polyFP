import { levenshtein } from './index';
import './types';

export function installLevenshtein() {
  if (!String.prototype.levenshtein) {
    Object.defineProperty(String.prototype, 'levenshtein', {
      value(this: string, b: string) {
        return levenshtein(this, b);
      },
      writable: true,
      configurable: true,
    });
  }
}
