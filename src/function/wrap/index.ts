export const wrap =
  <Args extends unknown[], Res, WrapArgs extends unknown[], Result>(
    fn: (...args: Args) => Res,
    wrapper: (fn: (...args: Args) => Res, ...wrapArgs: WrapArgs) => Result
  ): ((...wrapArgs: WrapArgs) => Result) =>
  (...wrapArgs: WrapArgs) =>
    wrapper(fn, ...wrapArgs);
