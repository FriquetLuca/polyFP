import type { RecordType } from '../../types';

export {};

declare global {
  interface Array<T> {
    rightJoin: T extends RecordType
      ? <U extends RecordType>(
          this: T[],
          records: U[],
          ...on: (keyof T & keyof U)[]
        ) => (U & Partial<T>)[]
      : never;
  }
  interface ReadonlyArray<T> {
    rightJoin: T extends RecordType
      ? <U extends RecordType>(
          this: readonly T[],
          records: U[],
          ...on: (keyof T & keyof U)[]
        ) => (U & Partial<T>)[]
      : never;
  }
}
