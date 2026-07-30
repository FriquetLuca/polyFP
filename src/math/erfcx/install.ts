import { erfcx } from './index.js';
export type * from './types';

if (!Math.erfcx) {
  Object.defineProperty(Math, 'erfcx', {
    value: erfcx,
    writable: true,
    configurable: true,
  });
}
