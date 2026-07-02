import { unique } from './index';
export * from './types';

export function installUnique() {
  if (!Array.unique) {
    Object.defineProperty(Array, 'unique', {
      value: unique,
      writable: true,
      configurable: true,
    });
  }
}
