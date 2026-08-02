export const wrap =
  <Args extends unknown[], Res, WrapArg, Result>(
    fn: (...args: Args) => Res,
    wrapper: (fn: (...args: Args) => Res, arg: WrapArg) => Result
  ): ((arg: WrapArg) => Result) =>
  (arg: WrapArg) =>
    wrapper(fn, arg);
