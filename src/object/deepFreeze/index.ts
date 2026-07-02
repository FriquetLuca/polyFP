import type { DeepReadonly } from '../../types';

export function deepFreeze<T extends object>(item: T): DeepReadonly<T> {
  for (const name in item) {
    const value = item[name];
    if ((value && typeof value === 'object') || typeof value === 'function') {
      Object.deepFreeze(value);
    }
  }
  return Object.freeze(item);
}
