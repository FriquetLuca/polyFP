export {};

declare global {
  interface FunctionConstructor {
    unary<Args extends unknown[], R>(
      fn: (...args: Args) => R
    ): (args: Args) => R;
  }
}
