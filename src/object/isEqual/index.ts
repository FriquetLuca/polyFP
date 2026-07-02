function isEqualInternal(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  a: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  b: any,
  visited: WeakMap<object, WeakMap<object, boolean>>
): boolean {
  if (a === b) return true;

  if (a == null || b == null) return false;

  if (typeof a !== 'object' || typeof b !== 'object') return a !== a && b !== b;

  let aVisited = visited.get(a);
  if (aVisited && aVisited.has(b)) return true;

  if (!aVisited) {
    aVisited = new WeakMap();
    visited.set(a, aVisited);
  }
  aVisited.set(b, true);

  if (a.constructor !== b.constructor) return false;

  let length: number;
  let i: number;

  if (Array.isArray(a)) {
    length = a.length;
    if (length !== b.length) return false;
    for (i = length; i-- !== 0;) {
      if (!isEqualInternal(a[i], b[i], visited)) return false;
    }
    return true;
  }

  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [key, value] of a.entries()) {
      if (!b.has(key) || !isEqualInternal(value, b.get(key), visited))
        return false;
    }
    return true;
  }

  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) return false;
    for (const value of a) {
      if (!b.has(value)) return false;
    }
    return true;
  }

  if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
    if (a.byteLength !== b.byteLength) return false;
    const view1 = new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
    const view2 = new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
    for (let i = 0; i < view1.length; i++) {
      if (view1[i] !== view2[i]) return false;
    }
    return true;
  }

  if (a.constructor === RegExp && b.constructor === RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }

  if (
    a.valueOf !== Object.prototype.valueOf &&
    b.valueOf !== Object.prototype.valueOf
  ) {
    return a.valueOf() === b.valueOf();
  }
  if (
    a.toString !== Object.prototype.toString &&
    b.valueOf !== Object.prototype.valueOf
  ) {
    return a.toString() === b.toString();
  }

  const keys = Object.keys(a);
  length = keys.length;
  if (length !== Object.keys(b).length) return false;

  for (i = length; i-- !== 0;) {
    if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
  }

  for (i = length; i-- !== 0;) {
    const key = keys[i];
    if (key === '_owner' && a.$$typeof) {
      continue;
    }

    if (!isEqualInternal(a[key], b[key], visited)) return false;
  }

  return true;
}

export const isEqual = <T, U>(a: T, b: U): boolean =>
  isEqualInternal(a, b, new WeakMap());
