import { describe, expect, it } from 'vitest';
import { jaro } from './jaro/index';

describe('jaro()', () => {
  it('returns 1 for identical strings', () => {
    expect(jaro('hello', 'hello')).toBe(1);
  });

  it('returns 0 when one string is empty', () => {
    expect(jaro('', 'hello')).toBe(0);
    expect(jaro('hello', '')).toBe(0);
  });

  it('returns 1 for two empty strings', () => {
    expect(jaro('', '')).toBe(1);
  });

  it('matches the MARTHA example', () => {
    expect(jaro('MARTHA', 'MARHTA')).toBeCloseTo(0.944444, 5);
  });

  it('matches the DWAYNE example', () => {
    expect(jaro('DWAYNE', 'DUANE')).toBeCloseTo(0.822222, 5);
  });

  it('matches the DIXON example', () => {
    expect(jaro('DIXON', 'DICKSONX')).toBeCloseTo(0.766667, 5);
  });

  it('returns 0 for completely different strings', () => {
    expect(jaro('abc', 'xyz')).toBe(0);
  });
});
