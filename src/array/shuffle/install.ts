import { shuffle } from './index';
export * from './types';

if (!Array.prototype.shuffle) {
  Object.defineProperty(Array.prototype, 'shuffle', {
    value<T>(this: T[]): T[] {
      return shuffle(this);
    },
    writable: true,
    configurable: true,
  });
}
