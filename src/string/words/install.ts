import { words } from './index.js';
export type * from './types';

if (!String.prototype.words) {
  Object.defineProperty(String.prototype, 'words', {
    value(this: string) {
      return words(this);
    },
    writable: true,
    configurable: true,
  });
}
