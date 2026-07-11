import { words } from './index';
import './types';

export function installWords() {
  if (!String.prototype.words) {
    Object.defineProperty(String.prototype, 'words', {
      value(this: string) {
        return words(this);
      },
      writable: true,
      configurable: true,
    });
  }
}
