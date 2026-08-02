export {};

declare global {
  interface FunctionConstructor {
    after<Args extends unknown[], R>(
      fn: (...args: Args) => R,
      n: number
    ): (...args: Args) => R | undefined;
  }
}
