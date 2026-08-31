import type { UnpivotedRow, Collapse } from '../../types';

export const unpivot = <T extends object, I extends keyof T, V extends keyof T>(
  rows: T[],
  idFields: I[],
  valueFields: V[]
): Collapse<UnpivotedRow<T, I, V>>[] =>
  rows.flatMap((row) => {
    const id = Object.fromEntries(idFields.map((f) => [f, row[f]]));
    return valueFields.map((field) => ({
      ...id,
      key: field,
      value: row[field],
    }));
  }) as unknown as Collapse<UnpivotedRow<T, I, V>>[];
