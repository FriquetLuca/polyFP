export function guard<T, Args extends unknown[]>(
  fn: (...args: Args) => T,
  fallback: T
): (...args: Args) => T {
  return function (...args: Args) {
    try {
      return fn(...args);
    } catch {
      return fallback;
    }
  };
}
