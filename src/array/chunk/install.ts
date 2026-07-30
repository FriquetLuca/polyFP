import { chunk } from './index.js';
export type * from './types';

if (!Array.prototype.chunk) {
  Object.defineProperty(Array.prototype, 'chunk', {
    value<T>(this: T[], size: number): T[][] {
      return chunk(this, size);
    },
    writable: true,
    configurable: true,
  });
}
