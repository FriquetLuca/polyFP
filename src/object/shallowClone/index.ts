import { isPlainObject } from '../isPlainObject/index.js';

export function shallowClone<T>(o: T): T {
  if (isPlainObject(o)) return { ...o };
  if (Array.isArray(o)) return [...o] as T;
  if (o instanceof Map) return new Map(o) as T;
  if (o instanceof Set) return new Set(o) as T;
  return o;
}
