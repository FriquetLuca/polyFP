import { invmod } from './index';
import './types';

export function installInvmod() {
  if (!Math.invmod) {
    Object.defineProperty(Math, 'invmod', {
      value: invmod,
      writable: true,
      configurable: true,
    });
  }
}
