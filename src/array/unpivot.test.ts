import { describe, it, expect, expectTypeOf } from 'vitest';
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

describe('unpivot', () => {
  it('produces one row per (input row × valueField)', () => {
    const result = unpivot(
      wideSales,
      ['store', 'date'],
      ['coffee', 'pastry', 'sandwich']
    );
    expect(result).toHaveLength(wideSales.length * 3);
  });

  it('carries the id fields through unchanged on every row', () => {
    const result = unpivot(wideSales, ['store', 'date'], ['coffee']);
    expect(result).toEqual([
      { store: 'Downtown', date: '2026-08-18', key: 'coffee', value: 120 },
      { store: 'Downtown', date: '2026-08-19', key: 'coffee', value: 135 },
      { store: 'Uptown', date: '2026-08-18', key: 'coffee', value: 90 },
    ]);
  });

  it('emits key/value pairs for every requested value field, in order', () => {
    const result = unpivot(
      [wideSales[0]],
      ['store'],
      ['coffee', 'pastry', 'sandwich']
    );
    expect(result).toEqual([
      { store: 'Downtown', key: 'coffee', value: 120 },
      { store: 'Downtown', key: 'pastry', value: '45' },
      { store: 'Downtown', key: 'sandwich', value: 30 },
    ]);
  });

  it("drops fields that aren't in idFields or valueFields", () => {
    const result = unpivot(wideSales, ['store'], ['coffee']);
    for (const row of result) {
      expect(row).not.toHaveProperty('date');
      expect(row).not.toHaveProperty('pastry');
      expect(row).not.toHaveProperty('sandwich');
    }
  });

  it('returns an empty array when given no rows', () => {
    const result = unpivot([] as DailySales[], ['store'], ['coffee']);
    expect(result).toEqual([]);
  });

  it('returns no rows per input row when valueFields is empty', () => {
    const result = unpivot(wideSales, ['store'], []);
    expect(result).toEqual([]);
  });

  it('supports zero id fields (value fields only)', () => {
    const result = unpivot(wideSales, [], ['coffee']);
    expect(result).toEqual([
      { key: 'coffee', value: 120 },
      { key: 'coffee', value: 135 },
      { key: 'coffee', value: 90 },
    ]);
  });

  it("narrows `value`'s type based on `key` at runtime (discriminated union)", () => {
    const result = unpivot(wideSales, ['store'], ['coffee', 'pastry']);
    for (const row of result) {
      if (row.key === 'pastry') {
        expect(typeof row.value).toBe('string');
        expect(row.value.toUpperCase()).toBe(row.value.toUpperCase());
      } else if (row.key === 'coffee') {
        expect(typeof row.value).toBe('number');
        expect(row.value.toFixed(0)).toBe(String(row.value));
      }
    }
  });

  it('keeps `key` and `value` correlated at the type level, per branch', () => {
    const result = unpivot(
      wideSales,
      ['store'],
      ['coffee', 'pastry', 'sandwich']
    );
    const [row] = result;
    if (row.key === 'pastry') {
      expectTypeOf(row.value).toEqualTypeOf<string>();
    } else if (row.key === 'coffee' || row.key === 'sandwich') {
      expectTypeOf(row.value).toEqualTypeOf<number>();
    }
    expectTypeOf(result).items.toEqualTypeOf<
      | { store: string; key: 'coffee'; value: number }
      | { store: string; key: 'pastry'; value: string }
      | { store: string; key: 'sandwich'; value: number }
    >();
  });
});
