import type { Collapse, PivotAggregators, PivotedRow } from '../../types';

export function pivot<
  Row extends { key: PropertyKey; value: unknown },
  I extends keyof Row,
  A extends PivotAggregators<Row>,
>(
  rows: Row[],
  idFields: I[],
  aggregators: A
): Collapse<PivotedRow<Row, I, A>>[] {
  const groups = new Map<
    string,
    { id: Pick<Row, I>; cells: Map<PropertyKey, unknown[]> }
  >();

  for (const row of rows) {
    const id = Object.fromEntries(idFields.map((f) => [f, row[f]]));
    const groupKey = JSON.stringify(id);

    if (!groups.has(groupKey))
      groups.set(groupKey, { id: id as Pick<Row, I>, cells: new Map() });
    const group = groups.get(groupKey)!;

    const key = row.key as PropertyKey;
    if (!group.cells.has(key)) group.cells.set(key, []);
    group.cells.get(key)!.push(row.value);
  }

  return [...groups.values()].map(({ id, cells }) => {
    const out = { ...id } as PivotedRow<Row, I, A>;
    for (const key of Object.keys(aggregators) as (keyof A)[]) {
      const values = cells.get(key as PropertyKey) ?? [];
      out[key] = aggregators[key](values as never) as PivotedRow<
        Row,
        I,
        A
      >[keyof A];
    }
    return out;
  }) as Collapse<PivotedRow<Row, I, A>>[];
}
