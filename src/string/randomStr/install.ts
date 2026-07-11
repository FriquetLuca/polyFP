import { randomStr } from './index';
import './types';

export function installRandomStr() {
  if (!String.randomStr) {
    Object.defineProperty(String, 'randomStr', {
      value(length: number, chars?: string) {
        return randomStr(length, chars);
      },
      writable: true,
      configurable: true,
    });
  }
}
