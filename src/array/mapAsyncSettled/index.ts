import type { SettledResult } from '../../types';

export async function mapAsyncSettled<T, R>(
  items: T[],
  fn: (item: T, index: number) => Promise<R>,
  concurrency = Infinity
): Promise<SettledResult<R>[]> {
  if (concurrency === Infinity || concurrency >= items.length) {
    return Promise.allSettled(items.map((item, i) => fn(item, i))) as Promise<
      SettledResult<R>[]
    >;
  }

  if (!Number.isInteger(concurrency) || concurrency <= 0) {
    throw new Error(
      'mapAsyncSettled: concurrency must be a positive integer or Infinity'
    );
  }

  const results = new Array<SettledResult<R>>(items.length);
  let nextIndex = 0;

  async function worker(): Promise<void> {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      try {
        const value = await fn(items[index], index);
        results[index] = { status: 'fulfilled', value };
      } catch (reason) {
        results[index] = { status: 'rejected', reason };
      }
    }
  }

  const workerCount = Math.min(concurrency, items.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));

  return results;
}

export function fulfilledValues<R>(results: readonly SettledResult<R>[]): R[] {
  return results
    .filter(
      (r): r is { status: 'fulfilled'; value: R } => r.status === 'fulfilled'
    )
    .map((r) => r.value);
}

export function rejectedReasons<R>(
  results: readonly SettledResult<R>[]
): unknown[] {
  return results
    .filter(
      (r): r is { status: 'rejected'; reason: unknown } =>
        r.status === 'rejected'
    )
    .map((r) => r.reason);
}
