import { pluck } from './index';
export * from './types';

if (!Array.prototype.pluck) {
  Object.defineProperty(Array.prototype, 'pluck', {
    value<T, K extends keyof T>(this: T[], key: K): T[K][] {
      return pluck(this, key);
    },
    writable: true,
    configurable: true,
  });
}
