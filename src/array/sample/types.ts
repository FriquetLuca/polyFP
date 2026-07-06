import type { Option } from '../../data/option';

export {};

declare global {
  interface Array<T> {
    sample(this: T[]): Option<T>;
  }
  interface ReadonlyArray<T> {
    sample(this: readonly T[]): Option<T>;
  }
}
