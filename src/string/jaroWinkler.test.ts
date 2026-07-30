import { describe, expect, it } from 'vitest';
import { jaroWinkler } from './jaroWinkler/index.js';

describe('jaroWinkler()', () => {
  it('returns 1 for identical strings', () => {
    expect(jaroWinkler('hello', 'hello')).toBe(1);
  });

  it('returns 0 when one string is empty', () => {
    expect(jaroWinkler('', 'hello')).toBe(0);
    expect(jaroWinkler('hello', '')).toBe(0);
  });

  it('returns 1 for two empty strings', () => {
    expect(jaroWinkler('', '')).toBe(1);
  });

  it('matches the MARTHA reference value', () => {
    expect(jaroWinkler('MARTHA', 'MARHTA')).toBeCloseTo(0.961111, 5);
  });

  it('matches the DWAYNE reference value', () => {
    expect(jaroWinkler('DWAYNE', 'DUANE')).toBeCloseTo(0.84, 5);
  });

  it('matches the DIXON reference value', () => {
    expect(jaroWinkler('DIXON', 'DICKSONX')).toBeCloseTo(0.813333, 5);
  });

  it('gives a score at least as high as Jaro when prefixes match', () => {
    expect(jaroWinkler('prefix', 'prefex')).toBeGreaterThan(0.9);
  });
});
