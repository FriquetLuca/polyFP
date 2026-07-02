import { pluck } from './index';
export * from './types';

export function installPluck() {
  if (!Array.pluck) {
    Object.defineProperty(Array, 'pluck', {
      value: pluck,
      writable: true,
      configurable: true,
    });
  }
}
