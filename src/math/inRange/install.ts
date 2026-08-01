import { inRange } from './index.js';
export type * from './types';

if (!Math.inRange) {
  Object.defineProperty(Math, 'inRange', {
    value: inRange,
    writable: true,
    configurable: true,
  });
}
