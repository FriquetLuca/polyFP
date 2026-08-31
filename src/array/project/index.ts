import { pick } from '../../object/pick/index.js';
import type { Collapse, ProjectedRow, ProjectionSpec } from '../../types';

export function project<T, K extends keyof T>(
  rows: T[],
  fields: readonly K[]
): Collapse<Pick<T, K>>[];
export function project<T, S extends ProjectionSpec<T>>(
  rows: T[],
  spec: S
): ProjectedRow<T, S>[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function project(rows: any[], specOrFields: any): any[] {
  if (Array.isArray(specOrFields)) {
    return rows.map((row) => pick(row, ...specOrFields));
  }
  const keys = Object.keys(specOrFields);
  return rows.map((row) => {
    const out: Record<string, unknown> = {};
    for (const key of keys) {
      const field = specOrFields[key];
      out[key] = typeof field === 'function' ? field(row) : row[field];
    }
    return out;
  });
}
