export {};

declare global {
  interface FunctionConstructor {
    memoize<TArg, TResult>(fn: (arg: TArg) => TResult): (arg: TArg) => TResult;
  }
}
