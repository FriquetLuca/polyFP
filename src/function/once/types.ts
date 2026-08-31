export {};

declare global {
  interface Function {
    once<Args extends unknown[], R>(
      this: (...args: Args) => R
    ): (...args: Args) => R;
  }
}
