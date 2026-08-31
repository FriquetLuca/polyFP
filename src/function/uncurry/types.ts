import type { Uncurry } from '../../types';

export {};

declare global {
  interface Function {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uncurry<T extends (...args: any) => any>(
      this: T
    ): (...args: Parameters<Uncurry<T>>) => ReturnType<Uncurry<T>>;
  }
}
