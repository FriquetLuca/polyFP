import { dotCase } from './index.js';
export type * from './types';

if (!String.prototype.dotCase) {
  Object.defineProperty(String.prototype, 'dotCase', {
    value(this: string) {
      return dotCase(this);
    },
    writable: true,
    configurable: true,
  });
}
