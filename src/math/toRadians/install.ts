import { toRadians } from './index';
import './types';

export function installToRadians() {
  if (!Math.toRadians) {
    Object.defineProperty(Math, 'toRadians', {
      value: toRadians,
      writable: true,
      configurable: true,
    });
  }
}
