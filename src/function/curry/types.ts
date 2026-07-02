import type { Currying } from '../../types';

export {};

declare global {
  interface FunctionConstructor {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    curry<T extends any[], R>(
      fn: (...args: T) => R,
      depth?: number,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...rest: any[]
    ): Currying<typeof fn>;
  }
}
