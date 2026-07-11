import { isIPv6 } from './index';
import './types';

if (!String.prototype.isIPv6) {
  Object.defineProperty(String.prototype, 'isIPv6', {
    value(this: string, strict?: boolean) {
      return isIPv6(this, strict);
    },
    writable: true,
    configurable: true,
  });
}
