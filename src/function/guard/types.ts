export {};

declare global {
  interface Function {
    guard<T, Args extends unknown[]>(
      this: (...args: Args) => T,
      fallback: T
    ): (...args: Args) => T;
  }
}
