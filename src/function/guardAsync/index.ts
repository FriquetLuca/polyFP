export function guardAsync<T, Args extends unknown[]>(
  fn: (...args: Args) => Promise<T>,
  fallback: T
): (...args: Args) => Promise<T> {
  return async function (...args: Args) {
    try {
      return await fn(...args);
    } catch {
      return fallback;
    }
  };
}
