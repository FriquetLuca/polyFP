import { chunk } from './index';
export * from './types';

export function installChunk() {
  if (!Array.chunk) {
    Object.defineProperty(Array, 'chunk', {
      value: chunk,
      writable: true,
      configurable: true,
    });
  }
}
