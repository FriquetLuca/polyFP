export function memoize<TArg, TResult>(
  fn: (arg: TArg) => TResult
): (arg: TArg) => TResult {
  const cache = new Map<TArg, TResult>();

  return (arg: TArg): TResult => {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }

    const result = fn(arg);
    cache.set(arg, result);

    return result;
  };
}
