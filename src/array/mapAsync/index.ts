export async function mapAsync<T, R>(
  items: T[],
  fn: (item: T, index: number) => Promise<R>,
  concurrency = Infinity
): Promise<R[]> {
  if (concurrency === Infinity || concurrency >= items.length) {
    return Promise.all(items.map((item, i) => fn(item, i)));
  }

  if (!Number.isInteger(concurrency) || concurrency <= 0) {
    throw new Error(
      'mapAsync: concurrency must be a positive integer or Infinity'
    );
  }

  const results = new Array<R>(items.length);
  let nextIndex = 0;

  // Each "worker" repeatedly claims the next unclaimed index and processes
  // it, until indices run out — this naturally keeps exactly `concurrency`
  // calls in flight at any time, since a worker only starts its next item
  // once its previous one resolves.
  async function worker(): Promise<void> {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await fn(items[index], index);
    }
  }

  const workerCount = Math.min(concurrency, items.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));

  return results;
}
