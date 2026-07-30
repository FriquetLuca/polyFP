import { zip } from './index.js';
export type * from './types';

if (!Array.prototype.zip) {
  Object.defineProperty(Array.prototype, 'zip', {
    value<A, B>(this: A[], bs: B[]): [A, B][] {
      return zip(this, bs);
    },
    writable: true,
    configurable: true,
  });
}
