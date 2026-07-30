import { isDateFormat } from './index.js';
export type * from './types';

if (!String.prototype.isDateFormat) {
  Object.defineProperty(String.prototype, 'isDateFormat', {
    value(this: string) {
      return isDateFormat(this);
    },
    writable: true,
    configurable: true,
  });
}
