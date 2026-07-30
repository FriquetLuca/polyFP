import { lerpAngle } from './index.js';
export type * from './types';

if (!Math.lerpAngle) {
  Object.defineProperty(Math, 'lerpAngle', {
    value: lerpAngle,
    writable: true,
    configurable: true,
  });
}
