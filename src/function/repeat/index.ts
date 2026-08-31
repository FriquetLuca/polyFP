import { timeout } from '../timeout/index.js';

export function repeat<T>(
  fn: (iteration: number) => Promise<T>,
  times: number,
  intervalMs = 0
): () => Promise<T[]> {
  if (!Number.isInteger(times) || times < 0)
    throw new Error('repeat: times must be a non-negative integer');
  return async function () {
    const results: T[] = [];
    for (let i = 0; i < times; i++) {
      results.push(await fn(i));
      if (i < times - 1 && intervalMs > 0) {
        await timeout(intervalMs);
      }
    }
    return results;
  };
}
