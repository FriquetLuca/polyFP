export const partial =
  <TArgs extends unknown[], TBoundArgs extends unknown[], TResult>(
    fn: (...args: [...TBoundArgs, ...TArgs]) => TResult,
    ...boundArgs: TBoundArgs
  ) =>
  (...remainingArgs: TArgs): TResult =>
    fn(...boundArgs, ...remainingArgs);
