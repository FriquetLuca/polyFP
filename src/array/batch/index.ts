export async function batch<T, R>(
  values: T[],
  concurrency: number,
  mapper: (value: T, index: number) => Promise<R> | R
): Promise<R[]> {
  if (concurrency <= 0) {
    throw new Error('Concurrency must be greater than 0.');
  }

  const results = new Array<R>(values.length);

  let next = 0;

  async function worker() {
    while (true) {
      const index = next++;

      if (index >= values.length) {
        return;
      }

      results[index] = await mapper(values[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, values.length) }, () => worker())
  );

  return results;
}
