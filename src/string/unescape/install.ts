import { unescape } from './index.js';
export type * from './types';

if (!String.prototype.unescape) {
  Object.defineProperty(String.prototype, 'unescape', {
    value(this: string) {
      return unescape(this);
    },
    writable: true,
    configurable: true,
  });
}
