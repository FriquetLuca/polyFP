export function after<Args extends unknown[], R>(
  fn: (...args: Args) => R,
  n: number
): (...args: Args) => R | undefined {
  return (...args: Args): R | undefined => {
    if (--n < 1) {
      return fn(...args);
    }
  };
}
