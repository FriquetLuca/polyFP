import { tap } from './index.js';
export type * from './types';

if (!Function.tap) {
  Object.defineProperty(Function, 'tap', {
    value: tap,
    writable: true,
    configurable: true,
  });
}
