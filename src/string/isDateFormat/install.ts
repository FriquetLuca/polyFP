import { isDateFormat } from './index';
import './types';

export function installIsDateFormat() {
  if (!String.prototype.isDateFormat) {
    Object.defineProperty(String.prototype, 'isDateFormat', {
      value(this: string) {
        return isDateFormat(this);
      },
      writable: true,
      configurable: true,
    });
  }
}
