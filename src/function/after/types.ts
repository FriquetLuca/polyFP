export {};

declare global {
  interface Function {
    after<Args extends unknown[], R>(
      this: (...args: Args) => R,
      n: number
    ): (...args: Args) => R | undefined;
  }
}
