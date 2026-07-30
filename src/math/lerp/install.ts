import { lerp } from './index.js';
export type * from './types';

if (!Math.lerp) {
  Object.defineProperty(Math, 'lerp', {
    value: lerp,
    writable: true,
    configurable: true,
  });
}
