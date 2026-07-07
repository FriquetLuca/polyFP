import { gamma } from './index';
import './types';

export function installGamma() {
  if (!Math.gamma) {
    Object.defineProperty(Math, 'gamma', {
      value: gamma,
      writable: true,
      configurable: true,
    });
  }
}
