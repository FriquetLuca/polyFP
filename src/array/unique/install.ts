export * from './types';

export function installUnique() {
  if (!Array.prototype.unique) {
    Object.defineProperty(Array.prototype, 'unique', {
      value<T>(this: readonly T[]): T[] {
        return [...new Set(this)];
      },
      writable: true,
      configurable: true,
    });
  }
}
