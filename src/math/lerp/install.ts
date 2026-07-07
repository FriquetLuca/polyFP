import { lerp } from './index';
import './types';

export function installLerp() {
  if (!Math.lerp) {
    Object.defineProperty(Math, 'lerp', {
      value: lerp,
      writable: true,
      configurable: true,
    });
  }
}
