import type { Collapse, UnpivotedRow } from '../../types';

export {};

declare global {
  interface Array<T> {
    unpivot: T extends object
      ? <I extends keyof T, V extends keyof T>(
          this: T[],
          idFields: I[],
          valueFields: V[]
        ) => Collapse<UnpivotedRow<T, I, V>>[]
      : never;
  }
  interface ReadonlyArray<T> {
    unpivot: T extends object
      ? <I extends keyof T, V extends keyof T>(
          this: readonly T[],
          idFields: I[],
          valueFields: V[]
        ) => Collapse<UnpivotedRow<T, I, V>>[]
      : never;
  }
}
