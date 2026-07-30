import { isEmail } from './index.js';
export type * from './types';

if (!String.prototype.isEmail) {
  Object.defineProperty(String.prototype, 'isEmail', {
    value(this: string) {
      return isEmail(this);
    },
    writable: true,
    configurable: true,
  });
}
