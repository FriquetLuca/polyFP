export function clone<T>(value: T): T {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as T;
  }

  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as T;
  }

  if (value instanceof Map) {
    const result = new Map();
    for (const [k, v] of value) {
      result.set(clone(k), clone(v));
    }
    return result as T;
  }

  if (value instanceof Set) {
    const result = new Set();
    for (const v of value) {
      result.add(clone(v));
    }
    return result as T;
  }

  if (Array.isArray(value)) {
    const result = new Array(value.length);

    for (let i = 0; i < value.length; i++) {
      result[i] = clone(value[i]);
    }

    return result as T;
  }

  const result = {} as Record<PropertyKey, unknown>;

  for (const key of Reflect.ownKeys(value)) {
    result[key] = clone((value as Record<PropertyKey, unknown>)[key]);
  }

  return result as T;
}
