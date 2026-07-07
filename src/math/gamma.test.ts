import { describe, expect, it } from 'vitest';
import { gamma } from './gamma';

describe('Gamma', () => {
  it('matches factorials', () => {
    expect(gamma(1)).toBeCloseTo(1, 12);
    expect(gamma(2)).toBeCloseTo(1, 12);
    expect(gamma(3)).toBeCloseTo(2, 12);
    expect(gamma(4)).toBeCloseTo(6, 12);
    expect(gamma(5)).toBeCloseTo(24, 12);
    expect(gamma(6)).toBeCloseTo(120, 10);
    expect(gamma(11)).toBeCloseTo(3628800, 4);
  });

  it('computes half integers', () => {
    expect(gamma(0.5)).toBeCloseTo(Math.sqrt(Math.PI), 12);
    expect(gamma(1.5)).toBeCloseTo(0.5 * Math.sqrt(Math.PI), 12);
    expect(gamma(2.5)).toBeCloseTo(0.75 * Math.sqrt(Math.PI), 12);
    expect(gamma(3.5)).toBeCloseTo(1.875 * Math.sqrt(Math.PI), 12);
    expect(gamma(4.5)).toBeCloseTo(6.5625 * Math.sqrt(Math.PI), 11);
  });

  it('computes negative half integers', () => {
    expect(gamma(-0.5)).toBeCloseTo(-2 * Math.sqrt(Math.PI), 11);
    expect(gamma(-1.5)).toBeCloseTo((4 / 3) * Math.sqrt(Math.PI), 11);
    expect(gamma(-2.5)).toBeCloseTo((-8 / 15) * Math.sqrt(Math.PI), 11);
  });

  it('satisfies Γ(x + 1) = xΓ(x)', () => {
    const values = [0.3, 0.8, 1.2, 2.7, 5.1, 10.5];

    for (const x of values) {
      expect(gamma(x + 1)).toBeCloseTo(x * gamma(x), 10);
    }
  });

  it('satisfies Euler reflection formula', () => {
    const values = [0.2, 0.37, 0.8];

    for (const x of values) {
      const lhs = gamma(x) * gamma(1 - x);
      const rhs = Math.PI / Math.sin(Math.PI * x);

      expect(lhs).toBeCloseTo(rhs, 9);
    }
  });

  it('approaches infinity at poles', () => {
    expect(gamma(0)).toBe(Infinity);
    expect(gamma(-1)).toBe(Infinity);
    expect(gamma(-2)).toBe(Infinity);
    expect(gamma(-3)).toBe(Infinity);
  });

  it('handles values close to zero', () => {
    expect(gamma(1e-10)).toBeCloseTo(1e10, -2);
  });

  it('computes larger values', () => {
    expect(gamma(20)).toBeCloseTo(121645100408832000, -3);
  });

  it('returns Infinity when overflowing', () => {
    expect(gamma(172)).toBe(Infinity);
    expect(gamma(1000)).toBe(Infinity);
  });

  it('returns NaN for NaN', () => {
    expect(gamma(NaN)).toBeNaN();
  });

  it('returns Infinity for positive infinity', () => {
    expect(gamma(Infinity)).toBe(Infinity);
  });

  it('returns NaN for negative infinity', () => {
    expect(gamma(-Infinity)).toBeNaN();
  });

  it('is continuous between poles', () => {
    const left = gamma(-0.999999);
    const right = gamma(-1.000001);

    expect(Number.isFinite(left)).toBe(true);
    expect(Number.isFinite(right)).toBe(true);

    expect(Math.sign(left)).not.toBe(Math.sign(right));
  });
});
