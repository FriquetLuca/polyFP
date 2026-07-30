import { hamming } from './index.js';
export type * from './types';

if (!String.prototype.hamming) {
  Object.defineProperty(String.prototype, 'hamming', {
    value(this: string, b: string) {
      return hamming(this, b);
    },
    writable: true,
    configurable: true,
  });
}
