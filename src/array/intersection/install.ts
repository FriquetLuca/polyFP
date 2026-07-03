export * from './types';

export function installIntersection() {
  if (!Array.prototype.intersection) {
    Object.defineProperty(Array.prototype, 'intersection', {
      value<T>(this: T[], b: readonly T[]) {
        const setB = new Set(b);
        return this.filter((x) => setB.has(x));
      },
      writable: true,
      configurable: true,
    });
  }
}
