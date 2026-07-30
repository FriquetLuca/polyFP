import { moveTowardsAngle } from './index.js';
export type * from './types';

if (!Math.moveTowardsAngle) {
  Object.defineProperty(Math, 'moveTowardsAngle', {
    value: moveTowardsAngle,
    writable: true,
    configurable: true,
  });
}
