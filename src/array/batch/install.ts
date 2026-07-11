import { batch } from './index';
export * from './types';

if (!Array.batch) {
  Object.defineProperty(Array, 'batch', {
    value: batch,
    writable: true,
    configurable: true,
  });
}
