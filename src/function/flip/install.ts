import { flip } from './index.js';
export type * from './types';

if (!Function.flip) {
  Object.defineProperty(Function, 'flip', {
    value: flip,
    writable: true,
    configurable: true,
  });
}
