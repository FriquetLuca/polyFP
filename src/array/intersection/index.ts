export function intersection<T>(a: T[], b: T[]) {
  const setB = new Set(b);
  return a.filter((x) => setB.has(x));
}
