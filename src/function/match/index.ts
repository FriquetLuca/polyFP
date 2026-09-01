export const match =
  <T extends string | number | symbol, TResult>(
    cases: Partial<Record<T, (value: T) => TResult>>,
    fallback?: (value: T) => TResult
  ) =>
  (value: T): TResult => {
    const handler = cases[value];
    if (handler) return handler(value);
    if (fallback) return fallback(value);
    throw new Error(`No case matched for value: ${String(value)}`);
  };
