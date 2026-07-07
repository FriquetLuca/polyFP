import { deltaAngle } from './index';
import './types';

export function installDeltaAngle() {
  if (!Math.deltaAngle) {
    Object.defineProperty(Math, 'deltaAngle', {
      value: deltaAngle,
      writable: true,
      configurable: true,
    });
  }
}
