import { randomIntInclusive } from './index.js';
export type * from './types';

if (!Math.randomIntInclusive) {
  Object.defineProperty(Math, 'randomIntInclusive', {
    value: randomIntInclusive,
    writable: true,
    configurable: true,
  });
}
