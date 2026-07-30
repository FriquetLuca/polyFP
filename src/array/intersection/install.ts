import { intersection } from './index.js';
export type * from './types';

if (!Array.prototype.intersection) {
  Object.defineProperty(Array.prototype, 'intersection', {
    value<T>(this: T[], b: T[]) {
      return intersection(this, b);
    },
    writable: true,
    configurable: true,
  });
}
