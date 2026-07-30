import { isDuration } from './index.js';
export type * from './types';

if (!String.prototype.isDuration) {
  Object.defineProperty(String.prototype, 'isDuration', {
    value(this: string, useExtended?: boolean) {
      return isDuration(this, useExtended);
    },
    writable: true,
    configurable: true,
  });
}
