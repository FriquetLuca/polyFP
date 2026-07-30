import { isIPv4 } from './index.js';
export type * from './types';

if (!String.prototype.isIPv4) {
  Object.defineProperty(String.prototype, 'isIPv4', {
    value(this: string) {
      return isIPv4(this);
    },
    writable: true,
    configurable: true,
  });
}
