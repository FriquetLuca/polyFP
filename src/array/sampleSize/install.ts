import { sampleSize } from './index';

export * from './types';

export function installSampleSize() {
  if (!Array.prototype.sampleSize) {
    Object.defineProperty(Array.prototype, 'sampleSize', {
      value<T>(this: T[], size: number): T[] {
        return sampleSize(this, size);
      },
      writable: true,
      configurable: true,
    });
  }
}
