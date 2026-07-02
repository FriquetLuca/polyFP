import { zip } from './index';
export * from './types';

export function installZip() {
  if (!Array.zip) {
    Object.defineProperty(Array, 'zip', {
      value: zip,
      writable: true,
      configurable: true,
    });
  }
}
