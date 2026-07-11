import { isLeapYear } from './index';
import './types';

export function installIsLeapYear() {
  if (!Date.prototype.isLeapYear) {
    Object.defineProperty(Date.prototype, 'isLeapYear', {
      value: isLeapYear,
      writable: true,
      configurable: true,
    });
  }
}
