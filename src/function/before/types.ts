export {};

declare global {
  interface FunctionConstructor {
    before<Args extends unknown[], R>(
      fn: (...args: Args) => R,
      n: number
    ): (...args: Args) => R;
  }
}
