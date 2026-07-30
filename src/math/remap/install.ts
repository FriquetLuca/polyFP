import { remap } from './index.js';
export type * from './types';

if (!Math.remap) {
  Object.defineProperty(Math, 'remap', {
    value: remap,
    writable: true,
    configurable: true,
  });
}
