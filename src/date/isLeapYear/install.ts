import { extendPrototype } from '../../utils.js';
import { isLeapYear } from './index.js';
export type * from './types';

extendPrototype(Date.prototype, {
  isLeapYear(this) {
    return isLeapYear(this);
  },
});
