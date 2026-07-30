import { frac } from './index.js';
export type * from './types';

if (!Math.frac) {
  Object.defineProperty(Math, 'frac', {
    value: frac,
    writable: true,
    configurable: true,
  });
}
