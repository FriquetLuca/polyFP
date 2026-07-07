import { clamp } from './index';
import './types';

export function installClamp() {
  if (!Math.clamp) {
    Object.defineProperty(Math, 'clamp', {
      value: clamp,
      writable: true,
      configurable: true,
    });
  }
}
