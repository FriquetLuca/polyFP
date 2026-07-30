import { unlerp } from './index.js';
export type * from './types';

if (!Math.unlerp) {
  Object.defineProperty(Math, 'unlerp', {
    value: unlerp,
    writable: true,
    configurable: true,
  });
}
