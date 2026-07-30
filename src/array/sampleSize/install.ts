import { sampleSize } from './index.js';

export type * from './types';

if (!Array.prototype.sampleSize) {
  Object.defineProperty(Array.prototype, 'sampleSize', {
    value<T>(this: T[], size: number): T[] {
      return sampleSize(this, size);
    },
    writable: true,
    configurable: true,
  });
}
