import { describe, it, expect, expectTypeOf } from 'vitest';
import { project } from './project';

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
    store: 'Uptown',
    date: '2026-08-18',
    coffee: 90,
    pastry: '60',
    sandwich: 15,
  },
];

describe('project', () => {
  describe('array shorthand (no renaming)', () => {
    it('keeps only the listed fields, preserving row order', () => {
      const result = project(wideSales, ['store', 'coffee']);
      expect(result).toEqual([
        { store: 'Downtown', coffee: 120 },
        { store: 'Uptown', coffee: 90 },
      ]);
    });

    it('drops every field not listed', () => {
      const result = project(wideSales, ['store']);
      for (const row of result) {
        expect(row).not.toHaveProperty('date');
        expect(row).not.toHaveProperty('coffee');
        expect(row).not.toHaveProperty('pastry');
        expect(row).not.toHaveProperty('sandwich');
      }
    });

    it('returns an empty array when given no rows', () => {
      const result = project([] as DailySales[], ['store']);
      expect(result).toEqual([]);
    });

    it('returns rows with no properties when given no fields', () => {
      const result = project(wideSales, []);
      expect(result).toEqual([{}, {}]);
    });

    it('infers a Pick<T, K> type', () => {
      const result = project(wideSales, ['store', 'coffee']);
      expectTypeOf(result).items.toEqualTypeOf<{
        store: string;
        coffee: number;
      }>();
    });
  });

  describe('spec object (rename + compute)', () => {
    it('renames fields according to the spec', () => {
      const result = project(wideSales, {
        storeName: 'store',
        coffeeUnits: 'coffee',
      });
      expect(result).toEqual([
        { storeName: 'Downtown', coffeeUnits: 120 },
        { storeName: 'Uptown', coffeeUnits: 90 },
      ]);
    });

    it('computes new fields from the whole row', () => {
      const result = project(wideSales, {
        store: 'store',
        totalDrinksAndFood: (row) => row.coffee + row.sandwich,
      });
      expect(result).toEqual([
        { store: 'Downtown', totalDrinksAndFood: 150 },
        { store: 'Uptown', totalDrinksAndFood: 105 },
      ]);
    });

    it('supports mixing renames and computed fields in one spec', () => {
      const result = project(wideSales, {
        store: 'store',
        pastryCount: (row) => Number(row.pastry),
        grandTotal: (row) => row.coffee + row.sandwich + Number(row.pastry),
      });
      expect(result).toEqual([
        { store: 'Downtown', pastryCount: 45, grandTotal: 195 },
        { store: 'Uptown', pastryCount: 60, grandTotal: 165 },
      ]);
    });

    it('drops any field not mentioned in the spec, even if renamed elsewhere', () => {
      const result = project(wideSales, { store: 'store' });
      for (const row of result) {
        expect(Object.keys(row)).toEqual(['store']);
      }
    });

    it('returns an empty array when given no rows', () => {
      const result = project([] as DailySales[], { store: 'store' });
      expect(result).toEqual([]);
    });

    it('returns rows with no properties when given an empty spec', () => {
      const result = project(wideSales, {});
      expect(result).toEqual([{}, {}]);
    });

    it('a computed field can see the original, unrenamed row shape', () => {
      const result = project(wideSales, {
        storeName: 'store',
        coffeeDoubled: (row) => row.coffee * 2,
      });
      expect(result[0]).toEqual({ storeName: 'Downtown', coffeeDoubled: 240 });
    });

    it("infers rename keys as the source field's type, and computed keys as the callback's return type", () => {
      const result = project(wideSales, {
        storeName: 'store',
        coffeeDoubled: (row) => row.coffee * 2,
      });

      expectTypeOf(result).items.toEqualTypeOf<{
        storeName: string;
        coffeeDoubled: number;
      }>();
    });

    it("does not allow a computed field's callback to reference a nonexistent field", () => {
      project(wideSales, {
        // @ts-expect-error - "espresso" doesn't exist on DailySales
        bad: (row) => row.espresso,
      });
    });

    it("does not allow renaming from a field that doesn't exist on the source type", () => {
      project(wideSales, {
        // @ts-expect-error - "latte" isn't a keyof DailySales
        bad: 'latte',
      });
    });
  });

  describe('composition with pivot/unpivot', () => {
    it('can post-process a pivoted result (rename + derived total)', () => {
      const pivoted = [
        { store: 'Downtown', coffee: 255, sandwich: 58 },
        { store: 'Uptown', coffee: 90, sandwich: 15 },
      ];
      const report = project(pivoted, {
        store: 'store',
        coffeeSold: 'coffee',
        grandTotal: (row) => row.coffee + row.sandwich,
      });
      expect(report).toEqual([
        { store: 'Downtown', coffeeSold: 255, grandTotal: 313 },
        { store: 'Uptown', coffeeSold: 90, grandTotal: 105 },
      ]);
    });
  });
});
