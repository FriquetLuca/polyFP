import type { SettledResult } from '../../types';

export {};

declare global {
  interface Array<T> {
    mapAsyncSettled<R>(
      this: T[],
      fn: (item: T, index: number) => Promise<R>,
      concurrency?: number
    ): Promise<SettledResult<R>[]>;
  }
  interface ReadonlyArray<T> {
    mapAsyncSettled<R>(
      this: readonly T[],
      fn: (item: T, index: number) => Promise<R>,
      concurrency?: number
    ): Promise<SettledResult<R>[]>;
  }
}
