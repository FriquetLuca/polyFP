export const match =
  <T extends string | number | symbol, TResult>(
    cases: Partial<Record<T, () => TResult>>,
    fallback?: () => TResult
  ) =>
  (value: T): TResult => {
    const handler = cases[value];
    if (handler) return handler();
    if (fallback) return fallback();
    throw new Error(`No case matched for value: ${String(value)}`);
  };
