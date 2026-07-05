import type { RecordType } from '../../types';

export {};

declare global {
  interface Array<T> {
    crossJoin: T extends RecordType
      ? <U extends RecordType>(this: T[], records: U[]) => (T & U)[]
      : never;
  }
  interface ReadonlyArray<T> {
    crossJoin: T extends RecordType
      ? <U extends RecordType>(this: readonly T[], records: U[]) => (T & U)[]
      : never;
  }
}
