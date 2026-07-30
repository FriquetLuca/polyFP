import { describe, expect, it } from 'vitest';
import { levenshtein } from './levenshtein/index.js';

describe('levenshtein()', () => {
  it('returns 0 for identical strings', () => {
    expect(levenshtein('hello', 'hello')).toBe(0);
  });

  it('handles substitutions', () => {
    expect(levenshtein('book', 'back')).toBe(2);
  });

  it('handles insertions', () => {
    expect(levenshtein('cat', 'cats')).toBe(1);
  });

  it('handles deletions', () => {
    expect(levenshtein('cats', 'cat')).toBe(1);
  });

  it('matches the classic kitten example', () => {
    expect(levenshtein('kitten', 'sitting')).toBe(3);
  });

  it('works with empty strings', () => {
    expect(levenshtein('', '')).toBe(0);
    expect(levenshtein('', 'abc')).toBe(3);
    expect(levenshtein('abc', '')).toBe(3);
  });
});
