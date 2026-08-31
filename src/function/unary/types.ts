export {};

declare global {
  interface Function {
    unary<Args extends unknown[], R>(
      this: (...args: Args) => R
    ): (args: Args) => R;
  }
}
