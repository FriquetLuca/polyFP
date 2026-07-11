import { moveTowardsAngle } from './index';
import './types';

if (!Math.moveTowardsAngle) {
  Object.defineProperty(Math, 'moveTowardsAngle', {
    value: moveTowardsAngle,
    writable: true,
    configurable: true,
  });
}
