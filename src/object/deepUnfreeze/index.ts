import type { DeepMutable } from '../../types';

export function deepUnfreeze<T extends object>(
  immutableData: T
): DeepMutable<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = {} as any;
  for (const name in immutableData) {
    const value = immutableData[name];
    if ((value && typeof value === 'object') || typeof value === 'function') {
      result[name] = deepUnfreeze(value);
    } else {
      result[name] = value;
    }
  }
  return result;
}
