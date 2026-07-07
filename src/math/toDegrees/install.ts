import { toDegrees } from './index';
import './types';

export function installToDegrees() {
  if (!Math.toDegrees) {
    Object.defineProperty(Math, 'toDegrees', {
      value: toDegrees,
      writable: true,
      configurable: true,
    });
  }
}
