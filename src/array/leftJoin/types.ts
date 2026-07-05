import type { RecordType } from '../../types';

export {};

declare global {
  interface Array<T> {
    leftJoin: T extends RecordType
      ? <U extends RecordType>(
          this: T[],
          records: U[],
          ...on: (keyof T & keyof U)[]
        ) => Array<T & Partial<U>>
      : never;
  }
  interface ReadonlyArray<T> {
    leftJoin: T extends RecordType
      ? <U extends RecordType>(
          this: readonly T[],
          records: U[],
          ...on: (keyof T & keyof U)[]
        ) => Array<T & Partial<U>>
      : never;
  }
}
