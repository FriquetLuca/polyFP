import { isURL } from './index';
import './types';

export function installIsURL() {
  if (!String.prototype.isURL) {
    Object.defineProperty(String.prototype, 'isURL', {
      value(this: string) {
        return isURL(this);
      },
      writable: true,
      configurable: true,
    });
  }
}
