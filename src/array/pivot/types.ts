import type { Collapse, PivotAggregators, PivotedRow } from '../../types';

export {};

declare global {
  interface ArrayConstructor {
    pivot<
      Row extends {
        key: PropertyKey;
        value: unknown;
      },
      I extends keyof Row,
      A extends PivotAggregators<Row>,
    >(
      this: Row[],
      idFields: I[],
      aggregators: A
    ): Collapse<PivotedRow<Row, I, A>>[];
  }
}
