export {};

declare global {
  interface FunctionConstructor {
    match<T extends string | number | symbol, TResult>(
      cases: Partial<Record<T, () => TResult>>,
      fallback?: () => TResult
    ): (value: T) => TResult;
  }
}
