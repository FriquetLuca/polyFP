import { mapAsync } from '../mapAsync/index.js';

export async function filterAsync<T>(
  items: T[],
  predicate: (item: T, index: number) => Promise<boolean>,
  concurrency = Infinity
): Promise<T[]> {
  const keep = await mapAsync(items, predicate, concurrency);
  return items.filter((_, i) => keep[i]);
}
