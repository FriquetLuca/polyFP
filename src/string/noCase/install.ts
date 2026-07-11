import { noCase } from './index';
import './types';

export function installNoCase() {
  if (!String.prototype.noCase) {
    Object.defineProperty(String.prototype, 'noCase', {
      value(this: string) {
        return noCase(this);
      },
      writable: true,
      configurable: true,
    });
  }
}
