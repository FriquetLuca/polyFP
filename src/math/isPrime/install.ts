import { isPrime } from './index';
import './types';

export function installIsPrime() {
  if (!Math.isPrime) {
    Object.defineProperty(Math, 'isPrime', {
      value: isPrime,
      writable: true,
      configurable: true,
    });
  }
}
