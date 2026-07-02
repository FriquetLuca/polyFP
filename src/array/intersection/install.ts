import { intersection } from './index';
export * from './types';

export function installIntersection() {
  if (!Array.intersection) {
    Object.defineProperty(Array, 'intersection', {
      value: intersection,
      writable: true,
      configurable: true,
    });
  }
}
