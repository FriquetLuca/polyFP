import { describe, expect, it } from 'vitest';
import { hamming } from './hamming/index';

describe('hamming()', () => {
  it('returns 0 for identical strings', () => {
    expect(hamming('hello', 'hello')).toBe(0);
  });

  it('counts differing characters', () => {
    expect(hamming('karolin', 'kathrin')).toBe(3);
  });

  it('works with binary strings', () => {
    expect(hamming('1011101', '1001001')).toBe(2);
  });

  it('works with empty strings', () => {
    expect(hamming('', '')).toBe(0);
  });

  it('throws when lengths differ', () => {
    expect(() => hamming('abc', 'ab')).toThrow(Error);
  });
});
