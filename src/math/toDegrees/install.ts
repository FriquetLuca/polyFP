import { toDegrees } from './index.js';
export type * from './types';

if (!Math.toDegrees) {
  Object.defineProperty(Math, 'toDegrees', {
    value: toDegrees,
    writable: true,
    configurable: true,
  });
}
