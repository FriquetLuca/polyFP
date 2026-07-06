import { batch } from './index';
export * from './types';

export function installBatch() {
  if (!Array.batch) {
    Object.defineProperty(Array, 'batch', {
      value: batch,
      writable: true,
      configurable: true,
    });
  }
}
