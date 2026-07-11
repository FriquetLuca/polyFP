import { window } from './index';
export * from './types';

if (!Array.prototype.window) {
  Object.defineProperty(Array.prototype, 'window', {
    value<T>(this: T[], size: number): T[][] {
      return window(this, size);
    },
    writable: true,
    configurable: true,
  });
}
