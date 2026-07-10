import type { AggregateBuilder } from '../../types';

export {};

declare global {
  interface Array<T> {
    aggregate<T>(this: T[]): AggregateBuilder<T, {}>;
  }
  interface ReadonlyArray<T> {
    aggregate<T>(this: readonly T[]): AggregateBuilder<T, {}>;
  }
}
