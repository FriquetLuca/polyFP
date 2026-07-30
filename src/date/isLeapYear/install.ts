import { isLeapYear } from './index.js';
export type * from './types';

if (!Date.prototype.isLeapYear) {
  Object.defineProperty(Date.prototype, 'isLeapYear', {
    value(this: Date) {
      return isLeapYear(this);
    },
    writable: true,
    configurable: true,
  });
}
