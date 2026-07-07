export * from './types';

export function installSwap() {
  if (!Array.prototype.swap) {
    Object.defineProperty(Array.prototype, 'swap', {
      value<T>(this: T[], a: number, b: number): T[] {
        if (a === b) return this;

        if (a < 0 || a >= this.length || b < 0 || b >= this.length) {
          throw new RangeError('Index out of bounds');
        }
        const result = this.slice();
        [result[a], result[b]] = [result[b], result[a]];
        return result;
      },
      writable: true,
      configurable: true,
    });
  }
}
