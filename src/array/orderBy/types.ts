import type { OrderBy, RecordType } from '../../types';

export {};

declare global {
  interface Array<T> {
    orderBy: T extends RecordType
      ? (
          this: T[],
          ordering: OrderBy<T>[],
          locales?: Intl.LocalesArgument,
          options?: Intl.CollatorOptions
        ) => T[]
      : never;
  }
  interface ReadonlyArray<T> {
    orderBy: T extends RecordType
      ? (
          this: readonly T[],
          ordering: OrderBy<T>[],
          locales?: Intl.LocalesArgument,
          options?: Intl.CollatorOptions
        ) => T[]
      : never;
  }
}
