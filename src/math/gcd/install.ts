import { gcd } from './index.js';
export type * from './types';

if (!Math.gcd) {
  Object.defineProperty(Math, 'gcd', {
    value: gcd,
    writable: true,
    configurable: true,
  });
}
