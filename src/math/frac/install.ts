import { frac } from './index';
import './types';

export function installFrac() {
  if (!Math.frac) {
    Object.defineProperty(Math, 'frac', {
      value: frac,
      writable: true,
      configurable: true,
    });
  }
}
