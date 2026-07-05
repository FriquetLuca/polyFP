import type { RecordType } from '../../types';

export {};

declare global {
  interface Array<T> {
    innerJoin: T extends RecordType
      ? <U extends RecordType>(
          this: T[],
          records: U[],
          ...on: (keyof T & keyof U)[]
        ) => (T & U)[]
      : never;
  }
  interface ReadonlyArray<T> {
    innerJoin: T extends RecordType
      ? <U extends RecordType>(
          this: readonly T[],
          records: U[],
          ...on: (keyof T & keyof U)[]
        ) => (T & U)[]
      : never;
  }
}
