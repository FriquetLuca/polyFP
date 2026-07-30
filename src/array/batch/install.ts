import { batch } from './index.js';
export type * from './types';

if (!Array.batch) {
  Object.defineProperty(Array, 'batch', {
    value: batch,
    writable: true,
    configurable: true,
  });
}
