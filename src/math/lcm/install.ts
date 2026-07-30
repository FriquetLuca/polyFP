import { lcm } from './index.js';
export type * from './types';

if (!Math.lcm) {
  Object.defineProperty(Math, 'lcm', {
    value: lcm,
    writable: true,
    configurable: true,
  });
}
