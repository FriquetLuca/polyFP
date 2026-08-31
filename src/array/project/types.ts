import type { Collapse, ProjectedRow, ProjectionSpec } from '../../types';

export {};

declare global {
  interface Array<T> {
    project<K extends keyof T>(
      this: T[],
      fields: readonly K[]
    ): Collapse<Pick<T, K>>[];
    project<S extends ProjectionSpec<T>>(
      this: T[],
      spec: S
    ): ProjectedRow<T, S>[];
  }
  interface ReadonlyArray<T> {
    project<K extends keyof T>(
      this: readonly T[],
      fields: readonly K[]
    ): Collapse<Pick<T, K>>[];
    project<S extends ProjectionSpec<T>>(
      this: readonly T[],
      spec: S
    ): ProjectedRow<T, S>[];
  }
}
