// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObject = (data: any): data is Record<PropertyKey, unknown> =>
  typeof data === 'object' && data !== null && !Array.isArray(data);

export function isPlainObject<T>(obj: T): boolean {
  if (isObject(obj) === false) return false;
  const ctor = obj.constructor;
  if (ctor === undefined) return true;
  if (typeof ctor !== 'function') return true;
  // modified prototype
  const prot = ctor.prototype;
  if (isObject(prot) === false) return false;
  // ctor doesn't have static `isPrototypeOf`
  if (Object.prototype.hasOwnProperty.call(prot, 'isPrototypeOf') === false)
    return false;
  return true;
}
