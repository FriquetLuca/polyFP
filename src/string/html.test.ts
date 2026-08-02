import { describe, it, expect } from 'vitest';
import { escape } from './escape/index.js';
import { unescape } from './unescape/index.js';

describe('escape & unescape', () => {
  describe('escape', () => {
    it('should escape HTML entities correctly', () => {
      expect(escape('A & B < C > D " E \' F ` G')).toBe(
        'A &amp; B &lt; C &gt; D &quot; E &#x27; F &#x60; G'
      );
    });

    it('should return unchanged string if no escapable characters exist', () => {
      expect(escape('hello world')).toBe('hello world');
    });
  });

  describe('unescape', () => {
    it('should unescape HTML entities correctly', () => {
      expect(
        unescape('A &amp; B &lt; C &gt; D &quot; E &#x27; F &#x60; G')
      ).toBe('A & B < C > D " E \' F ` G');
    });

    it('should return unchanged string if no unescapable entities exist', () => {
      expect(unescape('hello world')).toBe('hello world');
    });
  });
});
