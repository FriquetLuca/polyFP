export {};

declare global {
  interface Function {
    wrap<Args extends unknown[], Res, WrapArgs extends unknown[], Result>(
      this: (...args: Args) => Res,
      wrapper: (fn: (...args: Args) => Res, ...wrapArgs: WrapArgs) => Result
    ): (...wrapArgs: WrapArgs) => Result;
  }
}
