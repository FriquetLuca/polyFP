import { difference } from './index';
export * from './types';

export function installDifference() {
  if (!Array.difference) {
    Object.defineProperty(Array, 'difference', {
      value: difference,
      writable: true,
      configurable: true,
    });
  }
}
