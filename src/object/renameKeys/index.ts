export function renameKeys<
  T extends Record<PropertyKey, unknown>,
  M extends Partial<Record<keyof T, PropertyKey>>,
>(
  object: T,
  mapping: M
): {
  [
    K in keyof T as K extends keyof M
      ? M[K] extends PropertyKey
        ? M[K]
        : K
      : K
  ]: T[K];
} {
  const result: Record<PropertyKey, unknown> = {};

  for (const key of Reflect.ownKeys(object) as (keyof T)[]) {
    const newKey = (mapping[key] ?? key) as PropertyKey;
    result[newKey] = object[key];
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return result as any;
}
