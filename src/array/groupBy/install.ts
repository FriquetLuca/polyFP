import { groupBy } from './index';
export * from './types';

export function installGroupBy() {
  if (!Array.groupBy) {
    Object.defineProperty(Array, 'groupBy', {
      value: groupBy,
      writable: true,
      configurable: true,
    });
  }
}
