import { noCase } from './index.js';
export type * from './types';

if (!String.prototype.noCase) {
  Object.defineProperty(String.prototype, 'noCase', {
    value(this: string) {
      return noCase(this);
    },
    writable: true,
    configurable: true,
  });
}
