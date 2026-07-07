import { erf } from './index';
import './types';

export function installErf() {
  if (!Math.erf) {
    Object.defineProperty(Math, 'erf', {
      value: erf,
      writable: true,
      configurable: true,
    });
  }
}
