import { deltaAngle } from './index.js';
export type * from './types';

if (!Math.deltaAngle) {
  Object.defineProperty(Math, 'deltaAngle', {
    value: deltaAngle,
    writable: true,
    configurable: true,
  });
}
