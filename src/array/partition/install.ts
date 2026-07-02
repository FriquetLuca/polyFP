import { partition } from './index';
export * from './types';

export function installPartition() {
  if (!Array.partition) {
    Object.defineProperty(Array, 'partition', {
      value: partition,
      writable: true,
      configurable: true,
    });
  }
}
