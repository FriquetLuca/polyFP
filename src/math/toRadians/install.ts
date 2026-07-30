import { toRadians } from './index.js';
export type * from './types';

if (!Math.toRadians) {
  Object.defineProperty(Math, 'toRadians', {
    value: toRadians,
    writable: true,
    configurable: true,
  });
}
