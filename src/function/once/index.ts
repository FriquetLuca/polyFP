export function once<Args extends unknown[], R>(
  fn: (...args: Args) => R
): (...args: Args) => R {
  let called = false;
  let result!: R;
  return (...args: Args): R => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}
