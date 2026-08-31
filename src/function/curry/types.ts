import type { Currying } from '../../types';

export {};

declare global {
  interface Function {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    curry<T extends any[], R>(this: (...args: T) => R): Currying<typeof this>;
  }
}
