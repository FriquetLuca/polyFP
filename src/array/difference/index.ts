export function difference<T>(a: readonly T[], b: readonly T[]) {
  const setB = new Set(b);
  return a.filter((x) => !setB.has(x));
}
