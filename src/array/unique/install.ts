import { unique } from './index.js';
export type * from './types';

if (!Array.prototype.unique) {
  Object.defineProperty(Array.prototype, 'unique', {
    value<T>(this: T[]): T[] {
      return unique(this);
    },
    writable: true,
    configurable: true,
  });
}
