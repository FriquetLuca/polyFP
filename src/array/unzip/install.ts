import { unzip } from './index';
export * from './types';

export function installUnzip() {
  if (!Array.unzip) {
    Object.defineProperty(Array, 'unzip', {
      value: unzip,
      writable: true,
      configurable: true,
    });
  }
}
