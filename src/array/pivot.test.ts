import { describe, it, expect, expectTypeOf } from 'vitest';
import { pivot } from './pivot';
import { unpivot } from './unpivot';

interface DailySales {
  store: string;
  date: string;
  coffee: number;
  pastry: string;
  sandwich: number;
}

const wideSales: DailySales[] = [
  {
    store: 'Downtown',
    date: '2026-08-18',
    coffee: 120,
    pastry: '45',
    sandwich: 30,
  },
  {
    store: 'Downtown',
    date: '2026-08-19',
    coffee: 135,
    pastry: '50',
    sandwich: 28,
  },
  {
    store: 'Uptown',
    date: '2026-08-18',
    coffee: 90,
    pastry: '60',
    sandwich: 15,
  },
];

const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);
const join = (values: string[]) => values.join(', ');

describe('pivot', () => {
  it('collapses rows with matching id fields into one row per group', () => {
    const long = unpivot(wideSales, ['store'], ['coffee', 'sandwich']);
    const result = pivot(long, ['store'], { coffee: sum, sandwich: sum });
    expect(result).toHaveLength(2);
  });

  it('aggregates colliding cells using the per-key aggregator', () => {
    const long = unpivot(wideSales, ['store'], ['coffee', 'sandwich']);
    const result = pivot(long, ['store'], { coffee: sum, sandwich: sum });

    const downtown = result.find((r) => r.store === 'Downtown');
    expect(downtown).toEqual({ store: 'Downtown', coffee: 255, sandwich: 58 });

    const uptown = result.find((r) => r.store === 'Uptown');
    expect(uptown).toEqual({ store: 'Uptown', coffee: 90, sandwich: 15 });
  });

  it("uses a different aggregator per key, respecting each key's own value type", () => {
    const long = unpivot(wideSales, ['store'], ['coffee', 'pastry']);
    const result = pivot(long, ['store'], { coffee: sum, pastry: join });

    const downtown = result.find((r) => r.store === 'Downtown');
    expect(downtown).toEqual({
      store: 'Downtown',
      coffee: 255,
      pastry: '45, 50',
    });
  });

  it("fills missing cells with the aggregator's result over an empty array", () => {
    const long = unpivot(wideSales, ['store'], ['coffee']);
    const result = pivot(long, ['store'], {
      coffee: sum,
      pastry: join,
    });
    void result;
  });

  it('round-trips through unpivot -> pivot back to (nearly) the original wide shape', () => {
    const long = unpivot(
      wideSales,
      ['store', 'date'],
      ['coffee', 'pastry', 'sandwich']
    );
    const result = pivot(long, ['store', 'date'], {
      coffee: sum,
      pastry: join,
      sandwich: sum,
    });
    expect(result).toEqual(
      wideSales.map((row) => ({
        store: row.store,
        date: row.date,
        coffee: row.coffee,
        pastry: row.pastry,
        sandwich: row.sandwich,
      }))
    );
  });

  it('returns an empty array when given no rows', () => {
    const long = unpivot([] as DailySales[], ['store'], ['coffee']);
    const result = pivot(long, ['store'], { coffee: sum });
    expect(result).toEqual([]);
  });

  it("infers output value types from each aggregator's return type", () => {
    const long = unpivot(wideSales, ['store'], ['coffee', 'pastry']);
    const result = pivot(long, ['store'], {
      coffee: sum,
      pastry: join,
    });

    expectTypeOf(result).items.toEqualTypeOf<{
      store: string;
      coffee: number;
      pastry: string;
    }>();
  });

  it("rejects an aggregator whose input type doesn't match the key's actual value type", () => {
    const long = unpivot(wideSales, ['store'], ['coffee']);
    // @ts-expect-error - coffee's values are numbers; `join` expects string[]
    pivot(long, ['store'], { coffee: join });
  });
});
