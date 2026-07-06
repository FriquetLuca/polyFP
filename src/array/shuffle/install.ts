export * from './types';

export function installShuffle() {
  if (!Array.prototype.shuffle) {
    Object.defineProperty(Array.prototype, 'shuffle', {
      value<T>(this: T[]): T[] {
        const result = this.slice();
        for (let i = result.length - 1; i > 0; i--) {
          const j = (Math.random() * (i + 1)) | 0;
          [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
      },
      writable: true,
      configurable: true,
    });
  }
}
