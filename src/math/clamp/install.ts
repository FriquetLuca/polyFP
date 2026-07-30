import { clamp } from './index.js';
export type * from './types';

if (!Math.clamp) {
  Object.defineProperty(Math, 'clamp', {
    value: clamp,
    writable: true,
    configurable: true,
  });
}
