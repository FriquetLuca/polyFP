import { approximately } from './index';
import './types';

export function installApproximately() {
  if (!Math.approximately) {
    Object.defineProperty(Math, 'approximately', {
      value: approximately,
      writable: true,
      configurable: true,
    });
  }
}
