import { describe, it, expect } from 'vitest';
import { Sexagesimal } from './sexagesimal';

describe('Sexagesimal Class', () => {
  describe('Parsing', () => {
    it('should parse full format "10° 20\' 30" 500"', () => {
      const result = Sexagesimal.parse('10°20\'30"500')!;
      // 10 + 20/60 + 30.5/3600 = 10.341805555...
      expect(result.totalDegrees).toBeCloseTo(10.341805555, 6);
    });

    it('should parse partial format "10°30""', () => {
      const result = Sexagesimal.parse('10° 30"')!;
      // 10 + 30/3600 = 10.008333...
      expect(result.totalDegrees).toBeCloseTo(10.008333, 6);
    });

    it('should parse minimal format "15\'"', () => {
      const result = Sexagesimal.parse("15'")!;
      expect(result.totalDegrees).toBe(0.25);
    });

    it('should return 0 for empty or invalid strings', () => {
      const result = Sexagesimal.parse('invalid');
      expect(result).toBe(null);
    });
  });

  describe('Formatting (toString)', () => {
    it('should format correctly with padding', () => {
      const val = new Sexagesimal(10.341805555);
      expect(val.toString(3)).toBe('10°20\'30"500');
    });

    it('should handle negative numbers correctly', () => {
      const val = new Sexagesimal(-1.5);
      expect(val.toString()).toBe('-1°30\'0"000');
    });
  });

  describe('Arithmetic', () => {
    it('should add two Sexagesimal values', () => {
      const a = new Sexagesimal(1); // 1°
      const b = new Sexagesimal(0.5); // 0°30'
      const sum = a.add(b);
      expect(sum.totalDegrees).toBe(1.5);
      expect(sum.toString()).toBe('1°30\'0"000');
    });

    it('should subtract two Sexagesimal values', () => {
      const a = new Sexagesimal(1.5);
      const b = new Sexagesimal(0.5);
      const diff = a.subtract(b);
      expect(diff.totalDegrees).toBe(1);
    });
  });
});

describe('Parsing Negative Values', () => {
  it('should parse negative full format "-10° 20\' 30" 500"', () => {
    const result = Sexagesimal.parse('-10° 20\' 30" 500')!;
    // Expected: -(10 + 20/60 + 30.5/3600)
    expect(result.totalDegrees).toBeCloseTo(-10.341805555, 6);
  });

  it('should parse negative simple format "-15\'"', () => {
    const result = Sexagesimal.parse("-15'")!;
    expect(result.totalDegrees).toBe(-0.25);
  });

  it('should round-trip negative numbers correctly', () => {
    const input = '-10°20\'30"500';
    const parsed = Sexagesimal.parse(input)!;
    expect(parsed.toString()).toBe(input);
  });
});

describe('Sexagesimal Edge Cases', () => {
  describe('Formatting Quirks', () => {
    it('should handle aggressive whitespace', () => {
      // Spaces around symbols and numbers
      const result = Sexagesimal.parse('  10  °   20  \'  30  "  500  ')!;
      expect(result.totalDegrees).toBeCloseTo(10.341805555, 6);
    });

    it('should handle missing components correctly', () => {
      // Only degrees
      expect(Sexagesimal.parse('10°')!.totalDegrees).toBe(10);
      // Only minutes
      expect(Sexagesimal.parse("30'")!.totalDegrees).toBe(0.5);
      // Only DCM
      expect(Sexagesimal.parse('500')!.totalDegrees).toBeCloseTo(0.5 / 3600, 6);
    });
  });

  describe('Logical Boundaries', () => {
    it('should handle overflowing units (e.g., 90 minutes)', () => {
      // 90' is 1.5 degrees. 10° 90' should mathematically be 11.5°
      const result = Sexagesimal.parse("10° 90'")!;
      expect(result.totalDegrees).toBe(11.5);
    });

    it('should handle very long DCM strings', () => {
      // DCM = 500000 (micros?)
      const result = Sexagesimal.parse('0° 0\' 1" 500000')!;
      // 1.5 seconds / 3600 = 0.00041666...
      expect(result.totalDegrees).toBeCloseTo(1.5 / 3600, 6);
    });
  });

  describe('Garbage Input', () => {
    it('should return 0 when parsing completely garbage strings', () => {
      expect(Sexagesimal.parse('hello world')).toBe(null);
    });

    it('should partially parse what it can', () => {
      // Input has valid parts mixed with nonsense
      // "10°" is valid, "garbage" is ignored
      const result = Sexagesimal.parse('10° garbage');
      expect(result).toBe(null);
    });
  });
});

describe('isSexagesimal Strict Validation', () => {
  it('should return true for valid formats', () => {
    expect(Sexagesimal.isSexagesimal('10° 20\' 30" 500')).toBe(true);
    expect(Sexagesimal.isSexagesimal('10°')).toBe(true);
    expect(Sexagesimal.isSexagesimal('500')).toBe(true);
    expect(Sexagesimal.isSexagesimal("-10° 30'")).toBe(true);
  });

  it('should return false for garbage input', () => {
    expect(Sexagesimal.isSexagesimal('10° garbage')).toBe(false);
    expect(Sexagesimal.isSexagesimal('abc')).toBe(false);
    expect(Sexagesimal.isSexagesimal('10° 20\' 30" 500 extra stuff')).toBe(
      false
    );
  });

  it('should return false for empty or invalid values', () => {
    expect(Sexagesimal.isSexagesimal('')).toBe(false);
    expect(Sexagesimal.isSexagesimal('-')).toBe(false);
    expect(Sexagesimal.isSexagesimal('   ')).toBe(false);
  });
});
