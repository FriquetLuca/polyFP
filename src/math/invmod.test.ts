import { describe, expect, it } from 'vitest';
import { invmod } from './invmod';

describe('invmod', () => {
  it('computes modular inverses', () => {
    expect(invmod(3, 7)).toBe(5);
    expect(invmod(10, 17)).toBe(12);
    expect(invmod(7, 26)).toBe(15);
  });

  it('handles negative numbers', () => {
    expect(invmod(-3, 7)).toBe(2);
    expect(invmod(-10, 17)).toBe(5);
  });

  it('returns values in the range [0, b)', () => {
    for (const [a, b] of [
      [3, 7],
      [-3, 7],
      [10, 17],
    ]) {
      const result = invmod(a, b);

      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(b);
    }
  });

  it('throws when inverse does not exist', () => {
    expect(() => invmod(2, 4)).toThrow();

    expect(() => invmod(6, 15)).toThrow();
  });

  it('satisfies a*x ≡ 1 (mod b)', () => {
    for (const [a, b] of [
      [3, 7],
      [10, 17],
      [7, 26],
      [13, 29],
    ]) {
      const x = invmod(a, b);

      expect((a * x) % b).toBe(1);
    }
  });
});
