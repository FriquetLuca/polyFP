import { describe, expect, it } from 'vitest';
import { erf } from './erf';
import { erfc } from './erfc';
import { erfcx } from './erfcx';

describe('erf', () => {
  it('computes known values', () => {
    expect(erf(0)).toBe(0);
    expect(erf(0.5)).toBeCloseTo(0.5204998778130465, 15);
    expect(erf(1)).toBeCloseTo(0.8427007929497149, 15);
    expect(erf(2)).toBeCloseTo(0.9953222650189527, 15);
  });

  it('is an odd function', () => {
    for (const x of [0, 0.1, 0.5, 1, 3, 10]) {
      expect(erf(-x)).toBeCloseTo(-erf(x), 14);
    }
  });

  it('approaches limits', () => {
    expect(erf(10)).toBeCloseTo(1, 15);
    expect(erf(-10)).toBeCloseTo(-1, 15);
  });
});

describe('erfc', () => {
  it('computes known values', () => {
    expect(erfc(0)).toBeCloseTo(1, 15);
    expect(erfc(0.5)).toBeCloseTo(0.4795001221869535, 15);
    expect(erfc(1)).toBeCloseTo(0.1572992070502851, 15);
    expect(erfc(2)).toBeCloseTo(0.004677734981047266, 15);
  });

  it('satisfies erfc(x) = 1 - erf(x)', () => {
    for (const x of [-5, -2, -1, -0.5, 0, 0.5, 1, 2, 5]) {
      expect(erfc(x)).toBeCloseTo(1 - erf(x), 14);
    }
  });

  it('satisfies erfc(-x) = 2 - erfc(x)', () => {
    for (const x of [0.1, 0.5, 1, 3]) {
      expect(erfc(-x)).toBeCloseTo(2 - erfc(x), 14);
    }
  });

  it('approaches limits', () => {
    expect(erfc(10)).toBeCloseTo(0, 14);
    expect(erfc(-10)).toBeCloseTo(2, 14);
  });
});

describe('erfcx', () => {
  it('computes known values', () => {
    expect(erfcx(0)).toBeCloseTo(1, 15);
    expect(erfcx(0.5)).toBeCloseTo(0.6156903441929259, 15);
    expect(erfcx(1)).toBeCloseTo(0.427583576155807, 15);
    expect(erfcx(2)).toBeCloseTo(0.2553956763105057, 15);
  });

  it('satisfies erfcx(x) = exp(x*x) * erfc(x)', () => {
    for (const x of [0, 0.1, 0.5, 1, 2, 3]) {
      expect(erfcx(x)).toBeCloseTo(Math.exp(x * x) * erfc(x), 14);
    }
  });

  it('remains stable for large positive values', () => {
    expect(erfcx(10)).toBeCloseTo(0.05614099274382259, 14);

    expect(erfcx(100)).toBeCloseTo(0.005641613782989433, 14);
  });

  it('handles large negative values', () => {
    expect(erfcx(-10)).toBeGreaterThan(1e40);
  });
});

describe('relationships', () => {
  it('satisfies erf(x) + erfc(x) = 1', () => {
    for (const x of [-10, -3, -1, -0.5, 0, 0.5, 1, 3, 10]) {
      expect(erf(x) + erfc(x)).toBeCloseTo(1, 14);
    }
  });
});
