import type { MemoizeOptions } from '../../types';

export {};

declare global {
  interface Function {
    memoizeAsync<Args extends unknown[], R>(
      fn: (...args: Args) => Promise<R>,
      options?: MemoizeOptions<Args>
    ): ((...args: Args) => Promise<R>) & {
      clear: () => void;
    };
  }
}
