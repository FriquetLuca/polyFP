import { window } from './index';
export * from './types';

export function installWindow() {
  if (!Array.window) {
    Object.defineProperty(Array, 'window', {
      value: window,
      writable: true,
      configurable: true,
    });
  }
}
