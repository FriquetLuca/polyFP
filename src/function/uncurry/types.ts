import type { Uncurry } from '../../types';

export {};

declare global {
  interface FunctionConstructor {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uncurry<T extends (...args: any) => any>(
      fn: T
    ): (...args: Parameters<Uncurry<T>>) => ReturnType<Uncurry<T>>;
  }
}
