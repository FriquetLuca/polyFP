import { swapCase } from './index.js';
export type * from './types';

if (!String.prototype.swapCase) {
  Object.defineProperty(String.prototype, 'swapCase', {
    value(this: string) {
      return swapCase(this);
    },
    writable: true,
    configurable: true,
  });
}
