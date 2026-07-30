import { isDate } from './index.js';
export type * from './types';

if (!Date.isDate) {
  Object.defineProperty(Date, 'isDate', {
    value: isDate,
    writable: true,
    configurable: true,
  });
}
