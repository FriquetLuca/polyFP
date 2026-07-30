import { randomInt } from './index.js';
export type * from './types';

if (!Math.randomInt) {
  Object.defineProperty(Math, 'randomInt', {
    value: randomInt,
    writable: true,
    configurable: true,
  });
}
