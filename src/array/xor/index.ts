export function xor<T>(a: T[], b: T[]) {
  const setA = new Set(a);
  const setB = new Set(b);
  return [...a.filter((x) => !setB.has(x)), ...b.filter((x) => !setA.has(x))];
}
