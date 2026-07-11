import { swap } from './index';
export * from './types';

if (!Array.prototype.swap) {
  Object.defineProperty(Array.prototype, 'swap', {
    value<T>(this: T[], a: number, b: number): T[] {
      return swap(this, a, b);
    },
    writable: true,
    configurable: true,
  });
}
