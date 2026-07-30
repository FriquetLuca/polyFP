import { erf } from './index.js';
export type * from './types';

if (!Math.erf) {
  Object.defineProperty(Math, 'erf', {
    value: erf,
    writable: true,
    configurable: true,
  });
}
