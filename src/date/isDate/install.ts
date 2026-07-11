import { isDate } from './index';
import './types';

if (!Date.isDate) {
  Object.defineProperty(Date, 'isDate', {
    value: isDate,
    writable: true,
    configurable: true,
  });
}
