export {};

declare global {
  interface FunctionConstructor {
    once<Args extends unknown[], R>(
      fn: (...args: Args) => R
    ): (...args: Args) => R;
  }
}
