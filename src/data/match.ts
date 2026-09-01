export function match<A, B>(
  value: A,
  cases: Array<[(v: A) => boolean, (v: A) => B]>,
  fallback: (v: A) => B
): B {
  for (const [predicate, fn] of cases) {
    if (predicate(value)) return fn(value);
  }
  return fallback(value);
}
