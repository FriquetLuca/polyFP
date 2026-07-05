import type { RecordType } from '../../types';

export {};

declare global {
  interface Array<T> {
    fullJoin: T extends RecordType
      ? <U extends RecordType>(
          this: T[],
          records: U[],
          ...on: (keyof T & keyof U)[]
        ) => (Partial<T> & Partial<U>)[] | (T | U)[]
      : never;
  }
  interface ReadonlyArray<T> {
    fullJoin: T extends RecordType
      ? <U extends RecordType>(
          this: readonly T[],
          records: U[],
          ...on: (keyof T & keyof U)[]
        ) => (Partial<T> & Partial<U>)[] | (T | U)[]
      : never;
  }
}
