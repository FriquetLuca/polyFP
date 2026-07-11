import { isDate } from './index';
import './types';

export function installIsDate() {
  if (!Date.isDate) {
    Object.defineProperty(Date, 'isDate', {
      value: isDate,
      writable: true,
      configurable: true,
    });
  }
}
