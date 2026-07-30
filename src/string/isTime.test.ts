import { describe, it, expect } from 'vitest';
import { isTime } from './isTime/index.js';

describe('ISO 8601 Time Validator', () => {
  describe('Success Cases (Valid ISO 8601)', () => {
    it('should validate full extended format', () => {
      expect(isTime('T12:30:45.123')).toBe(true);
    });

    it('should validate full extended format', () => {
      expect(isTime('12:30:45.123')).toBe(true);
    });

    it('should validate full basic format', () => {
      expect(isTime('123045.123')).toBe(true);
    });

    it('should validate format without milliseconds', () => {
      expect(isTime('12:30:45')).toBe(true);
      expect(isTime('123045')).toBe(true);
    });

    it('should validate partial time (hh:mm)', () => {
      expect(isTime('12:30')).toBe(true);
      expect(isTime('1230')).toBe(true);
    });

    it('should validate minimal time (hh)', () => {
      expect(isTime('12')).toBe(true);
    });

    it('should accept comma as a fractional separator in extended format', () => {
      expect(isTime('12:30:45,123')).toBe(true);
    });

    it('should accept comma as a fractional separator in basic format', () => {
      expect(isTime('123045,123')).toBe(true);
    });
  });

  describe('Failure Cases (Invalid Time)', () => {
    it('should reject out-of-range hours', () => {
      expect(isTime('25:00')).toBe(false);
    });

    it('should reject out-of-range minutes', () => {
      expect(isTime('12:61')).toBe(false);
    });

    it('should reject invalid characters', () => {
      expect(isTime('T12-30-45')).toBe(false);
      expect(isTime('Tabc')).toBe(false);
    });

    it('should reject invalid characters', () => {
      expect(isTime('12-30-45')).toBe(false);
      expect(isTime('abc')).toBe(false);
    });

    it('should reject partial time (hh:mmss)', () => {
      expect(isTime('12:3045')).toBe(false);
    });

    it('should reject mixed separators (dot and comma)', () => {
      expect(isTime('12:30:45,.123')).toBe(false);
    });
  });
});
