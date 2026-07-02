import type { Collapse, TransformKeys } from '../../types';

export {};

declare global {
  interface ObjectConstructor {
    select<
      T extends object,
      U extends keyof T,
      V extends string,
      W extends {
        key: U;
        as?: V | undefined;
      },
    >(
      obj: T,
      ...items: W[]
    ): Collapse<TransformKeys<T, W>>;
  }
}
