export interface MemoizeOptions<Args extends unknown[]> {
  keyFn?: (...args: Args) => string;
  ttlMs?: number; // if set, an entry expires and re-runs after this long
}

export function memoize<Args extends unknown[], R>(
  fn: (...args: Args) => R,
  options: MemoizeOptions<Args> = {}
): ((...args: Args) => R) & { clear: () => void } {
  const keyFn = options.keyFn ?? ((...args: Args) => JSON.stringify(args));
  const cache = new Map<string, { result: R; expiresAt: number }>();

  const memoized = (...args: Args): R => {
    const key = keyFn(...args);
    const cached = cache.get(key);

    if (cached && cached.expiresAt > Date.now()) {
      return cached.result;
    }

    const result = fn(...args);
    cache.set(key, {
      result,
      expiresAt: Date.now() + (options.ttlMs ?? Infinity),
    });
    return result;
  };

  memoized.clear = () => cache.clear();
  return memoized;
}
