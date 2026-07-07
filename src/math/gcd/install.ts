import { gcd } from './index';
import './types';

export function installGCD() {
  if (!Math.gcd) {
    Object.defineProperty(Math, 'gcd', {
      value: gcd,
      writable: true,
      configurable: true,
    });
  }
}
