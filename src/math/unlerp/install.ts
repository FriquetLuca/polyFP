import { unlerp } from './index';
import './types';

export function installUnlerp() {
  if (!Math.unlerp) {
    Object.defineProperty(Math, 'unlerp', {
      value: unlerp,
      writable: true,
      configurable: true,
    });
  }
}
