import { initials } from './index';
import './types';

export function installInitials() {
  if (!String.prototype.initials) {
    Object.defineProperty(String.prototype, 'initials', {
      value(this: string) {
        return initials(this);
      },
      writable: true,
      configurable: true,
    });
  }
}
