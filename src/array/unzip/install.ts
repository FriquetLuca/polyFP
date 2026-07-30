import { unzip } from './index.js';
export type * from './types';

if (!Array.unzip) {
  Object.defineProperty(Array, 'unzip', {
    value: unzip,
    writable: true,
    configurable: true,
  });
}
