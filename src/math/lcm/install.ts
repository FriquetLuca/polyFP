import { lcm } from './index';
import './types';

export function installLCM() {
  if (!Math.lcm) {
    Object.defineProperty(Math, 'lcm', {
      value: lcm,
      writable: true,
      configurable: true,
    });
  }
}
