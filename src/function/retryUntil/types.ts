import type { RetryUntilOptions } from '../../types';

export {};

declare global {
  interface Function {
    retryUntil<T, Args extends unknown[]>(
      this: (...args: Args) => Promise<T>,
      predicate: (result: T) => boolean,
      options?: RetryUntilOptions
    ): (...args: Args) => Promise<T>;
  }
}
