import type { Pool } from '../../types';

export {};

declare global {
  interface Array<T> {
    pool(this: T[]): Pool<T>;
  }
  interface ReadonlyArray<T> {
    pool(this: readonly T[]): Pool<T>;
  }
}
