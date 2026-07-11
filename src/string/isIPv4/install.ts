import { isIPv4 } from './index';
import './types';

export function installIsIPv4() {
  if (!String.prototype.isIPv4) {
    Object.defineProperty(String.prototype, 'isIPv4', {
      value(this: string) {
        return isIPv4(this);
      },
      writable: true,
      configurable: true,
    });
  }
}
