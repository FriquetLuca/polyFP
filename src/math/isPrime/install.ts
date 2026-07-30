import { isPrime } from './index.js';
export type * from './types';

if (!Math.isPrime) {
  Object.defineProperty(Math, 'isPrime', {
    value: isPrime,
    writable: true,
    configurable: true,
  });
}
