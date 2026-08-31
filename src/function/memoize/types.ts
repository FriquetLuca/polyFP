import type { MemoizeOptions } from '.';

export {};

declare global {
  interface Function {
    memoize<Args extends unknown[], R>(
      this: (...args: Args) => R,
      options?: MemoizeOptions<Args>
    ): ((...args: Args) => R) & {
      clear: () => void;
    };
  }
}
