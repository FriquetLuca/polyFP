export const matchPredicate =
  <A, B>(
    cases: Array<[(v: A) => boolean, (v: A) => B]>,
    fallback?: (v: A) => B
  ) =>
  (value: A) => {
    for (const [predicate, fn] of cases) {
      if (predicate(value)) return fn(value);
    }
    if (fallback) return fallback(value);
    throw new Error(`No case matched for value: ${String(value)}`);
  };
