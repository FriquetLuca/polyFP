import { describe, it, expect } from 'vitest';
import { isDateFormat } from './isDateFormat';

describe('ISO 8601 Full Specification Coverage', () => {
  const validFormats = [
    '2026',
    '2026-07-09',
    '260709',
    '20260709',
    '2026-07',
    '2026-W28',
    '2026-W28-4',
    '2026W28',
    '2026W284',
    '2026191',
    '2026-190',
    '2026190',
    '2026-07-09T12:30:45Z',
    '2026-07-09T12:30:45+02:00',
  ];

  const invalidFormats = [
    '09/07/2026',
    'T12:30:45.123',
    'T123045.123',
    'T12:30:45',
    'T123045',
    'T12:30.5',
    'T1230.5',
    'T12:30',
    'T1230',
    'T12.5',
    'T12',
    '26-07-09',
    '2026/07/09',
    '-26-07',
    '-2607',
    '--07-09',
    '--0709',
    '--07',
    '---09',
    'not-a-date',
    '12:61:00',
    '25:00:00',
    // Delimiter/Format mixing
    '2026:07:09', // Colon used for Date (should be -)
    '2026-0709', // Mixed separator (partial hyphen)
    '2026.07.09', // Dot used for Date (only allowed in Time)

    // Logical/Calendar edge cases
    '2026-13-01', // Month 13 is invalid
    '2026-07-32', // Day 32 is invalid
    '2026-W55', // Week 55 is invalid (max is usually 52/53)
    '2026-367', // Ordinal day 367 is invalid

    // Precision/Structure mistakes
    '2026-', // Trailing hyphen
    '-07-', // Incomplete segment
    '2026-W', // Missing week number
    '2026-W28-', // Trailing hyphen after week-day

    // Time/Zone edge cases
    'T25:00', // Hour 25
    'T12:60', // Minute 60
    'T12:30:61', // Second 61
    '2026-07-09T12:30Z+02:00', // Cannot have both 'Z' AND an offset
    '2026-07-09T12:30+02:60', // Invalid timezone offset minutes
  ];

  validFormats.forEach((format) => {
    it(`should accept valid format: ${format}`, () => {
      expect(isDateFormat(format)).toBe(true);
    });
  });

  invalidFormats.forEach((format) => {
    it(`should reject invalid format: ${format}`, () => {
      expect(isDateFormat(format)).toBe(false);
    });
  });
});
