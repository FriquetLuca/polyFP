import { moveTowards } from './index.js';
export type * from './types';

if (!Math.moveTowards) {
  Object.defineProperty(Math, 'moveTowards', {
    value: moveTowards,
    writable: true,
    configurable: true,
  });
}
