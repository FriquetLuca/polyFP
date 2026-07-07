import { lerpAngle } from './index';
import './types';

export function installLerpAngle() {
  if (!Math.lerpAngle) {
    Object.defineProperty(Math, 'lerpAngle', {
      value: lerpAngle,
      writable: true,
      configurable: true,
    });
  }
}
