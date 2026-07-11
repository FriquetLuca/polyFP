import { isLeapYear } from './index';
import './types';

if (!Date.prototype.isLeapYear) {
  Object.defineProperty(Date.prototype, 'isLeapYear', {
    value(this: Date) {
      return isLeapYear(this);
    },
    writable: true,
    configurable: true,
  });
}
