export function isClass<T>(fn: T): boolean {
  if (typeof fn !== 'function') return false;
  const proto = fn.prototype;
  if (!proto) return false;
  const descriptor = Object.getOwnPropertyDescriptor(proto, 'constructor');
  return (
    descriptor !== undefined &&
    !descriptor.enumerable &&
    descriptor.configurable === true
  );
}
