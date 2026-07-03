export * from './types';

export function installPluck() {
  if (!Array.prototype.pluck) {
    Object.defineProperty(Array.prototype, 'pluck', {
      value<T, K extends keyof T>(this: T[], key: K): T[K][] {
        return this.map((x) => x[key]);
      },
      writable: true,
      configurable: true,
    });
  }
}
