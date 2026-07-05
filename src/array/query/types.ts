import type { QueryParameters, QueryResult, RecordType } from '../../types';

export {};

declare global {
  interface Array<T> {
    query: T extends RecordType
      ? <Select extends { key: keyof T; as?: string }>(
          this: T[],
          q: QueryParameters<T, Select>,
          locales?: Intl.LocalesArgument,
          options?: Intl.CollatorOptions
        ) => QueryResult<T, Select>[]
      : never;
  }
  interface ReadonlyArray<T> {
    query: T extends RecordType
      ? <Select extends { key: keyof T; as?: string }>(
          this: readonly T[],
          q: QueryParameters<T, Select>,
          locales?: Intl.LocalesArgument,
          options?: Intl.CollatorOptions
        ) => QueryResult<T, Select>[]
      : never;
  }
}
