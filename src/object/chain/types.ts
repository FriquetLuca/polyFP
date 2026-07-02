import type { Chain } from '../../types';

export {};

declare global {
  interface ObjectConstructor {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chain<T extends Record<string | number | symbol, (...args: any) => any>>(
      fns: T
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    ): Chain<T, {}>;
  }
}
