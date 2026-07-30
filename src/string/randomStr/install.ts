import { randomStr } from './index.js';
export type * from './types';

if (!String.randomStr) {
  Object.defineProperty(String, 'randomStr', {
    value(length: number, chars?: string) {
      return randomStr(length, chars);
    },
    writable: true,
    configurable: true,
  });
}
