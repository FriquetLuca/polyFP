import { mapAsync } from '../mapAsync/index.js';

export async function forEachAsync<T>(
  items: T[],
  fn: (item: T, index: number) => Promise<void>,
  concurrency = Infinity
): Promise<void> {
  await mapAsync(items, fn, concurrency);
}
