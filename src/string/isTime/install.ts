import { isTime } from './index';
import './types';

export function installIsTime() {
  if (!String.prototype.isTime) {
    Object.defineProperty(String.prototype, 'isTime', {
      value(this: string) {
        return isTime(this);
      },
      writable: true,
      configurable: true,
    });
  }
}
