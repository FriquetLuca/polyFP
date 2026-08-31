export {};

declare global {
  interface Function {
    before<Args extends unknown[], R>(
      this: (...args: Args) => R,
      n: number
    ): (...args: Args) => R;
  }
}
