import { moveTowards } from './index';
import './types';

export function installMoveTowards() {
  if (!Math.moveTowards) {
    Object.defineProperty(Math, 'moveTowards', {
      value: moveTowards,
      writable: true,
      configurable: true,
    });
  }
}
