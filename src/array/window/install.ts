export * from './types';

export function installWindow() {
  if (!Array.prototype.window) {
    Object.defineProperty(Array.prototype, 'window', {
      value<T>(this: T[], size: number): T[][] {
        const result: T[][] = [];

        for (let i = 0; i <= this.length - size; i++) {
          result.push(this.slice(i, i + size));
        }

        return result;
      },
      writable: true,
      configurable: true,
    });
  }
}
