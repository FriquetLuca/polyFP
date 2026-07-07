import { moveTowardsAngle } from './index';
import './types';

export function installMoveTowardsAngle() {
  if (!Math.moveTowardsAngle) {
    Object.defineProperty(Math, 'moveTowardsAngle', {
      value: moveTowardsAngle,
      writable: true,
      configurable: true,
    });
  }
}
