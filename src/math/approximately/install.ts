import { approximately } from './index.js';
export type * from './types';

if (!Math.approximately) {
  Object.defineProperty(Math, 'approximately', {
    value: approximately,
    writable: true,
    configurable: true,
  });
}
