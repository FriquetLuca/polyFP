import type { MemoizeAsyncOptions } from '.';

export {};

declare global {
  interface Function {
    memoizeAsync<Args extends unknown[], R>(
      fn: (...args: Args) => Promise<R>,
      options?: MemoizeAsyncOptions<Args>
    ): ((...args: Args) => Promise<R>) & {
      clear: () => void;
    };
  }
}
