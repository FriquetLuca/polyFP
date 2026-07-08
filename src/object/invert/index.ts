export function invert<T extends Record<PropertyKey, PropertyKey>>(
  object: T
): { [K in keyof T as T[K]]: K } {
  const result: Record<PropertyKey, PropertyKey> = {};

  for (const key of Reflect.ownKeys(object) as (keyof T)[]) {
    result[object[key]] = key;
  }

  return result as { [K in keyof T as T[K]]: K };
}
