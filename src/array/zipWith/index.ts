export function zipWith<A, B, R>(
  a: A[],
  b: B[],
  fn: (a: A, b: B, index: number) => R
): R[] {
  const length = Math.min(a.length, b.length);
  const result = new Array<R>(length);

  for (let i = 0; i < length; i++) {
    result[i] = fn(a[i], b[i], i);
  }

  return result;
}
