export interface MemoizeAsyncOptions<Args extends unknown[]> {
  keyFn?: (...args: Args) => string;
  ttlMs?: number; // if set, a resolved entry expires and re-runs after this long
}

export function memoizeAsync<Args extends unknown[], R>(
  fn: (...args: Args) => Promise<R>,
  options: MemoizeAsyncOptions<Args> = {}
): ((...args: Args) => Promise<R>) & { clear: () => void } {
  const keyFn = options.keyFn ?? ((...args: Args) => JSON.stringify(args));
  const cache = new Map<string, { promise: Promise<R>; expiresAt: number }>();

  const memoized = (...args: Args): Promise<R> => {
    const key = keyFn(...args);
    const cached = cache.get(key);

    if (cached && cached.expiresAt > Date.now()) {
      return cached.promise;
    }

    const promise = fn(...args).catch((err) => {
      cache.delete(key); // never cache a rejection
      throw err;
    });

    cache.set(key, {
      promise,
      expiresAt: Date.now() + (options.ttlMs ?? Infinity),
    });
    return promise;
  };

  memoized.clear = () => cache.clear();

  return memoized;
}
