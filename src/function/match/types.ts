export {};

declare global {
  interface FunctionConstructor {
    match<T extends string | number | symbol, TResult>(
      cases: Record<T, () => TResult>
    ): (value: T) => TResult;
  }
}
