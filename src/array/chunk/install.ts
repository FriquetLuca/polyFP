export * from './types';

export function installChunk() {
  if (!Array.prototype.chunk) {
    Object.defineProperty(Array.prototype, 'chunk', {
      value<T>(this: T[], size: number): T[][] {
        const result: T[][] = [];
        for (let i = 0; i < this.length; i += size) {
          result.push(this.slice(i, i + size));
        }
        return result;
      },
      writable: true,
      configurable: true,
    });
  }
}
