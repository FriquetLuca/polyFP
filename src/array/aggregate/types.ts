import type { AggregateBuilder } from '../../types';

export {};

declare global {
  interface Array<T> {
    aggregate(this: T[]): AggregateBuilder<T>;
  }
  interface ReadonlyArray<T> {
    aggregate(this: readonly T[]): AggregateBuilder<T>;
  }
}
