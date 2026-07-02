import type { Collapse, DeepMerge } from '../../types';

export {};

declare global {
  interface ObjectConstructor {
    deepMerge<T extends object, U extends object[]>(
      target: T,
      ...sources: U
    ): Collapse<DeepMerge<[T, ...U]>>;
  }
}
