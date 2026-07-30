import { isURL } from './index.js';
export type * from './types';

if (!String.prototype.isURL) {
  Object.defineProperty(String.prototype, 'isURL', {
    value(this: string) {
      return isURL(this);
    },
    writable: true,
    configurable: true,
  });
}
