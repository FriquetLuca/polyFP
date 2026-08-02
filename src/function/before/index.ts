export function before<Args extends unknown[], R>(
  fn: (...args: Args) => R,
  n: number
): (...args: Args) => R {
  let result!: R;
  return (...args: Args): R => {
    if (--n > 0) {
      result = fn(...args);
    }
    return result;
  };
}
