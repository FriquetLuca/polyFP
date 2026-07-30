import { move } from './index.js';

export type * from './types';

if (!Array.prototype.move) {
  Object.defineProperty(Array.prototype, 'move', {
    value<T>(this: T[], from: number, to: number): T[] {
      return move(this, from, to);
    },
    writable: true,
    configurable: true,
  });
}
