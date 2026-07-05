export * from './types';

export function installDifference() {
  if (!Array.prototype.difference) {
    Object.defineProperty(Array.prototype, 'difference', {
      value<T>(this: T[], b: T[]) {
        const setB = new Set(b);
        return this.filter((x) => !setB.has(x));
      },
      writable: true,
      configurable: true,
    });
  }
}
