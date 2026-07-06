import { describe, expect, it } from 'vitest';

import { some, none } from './option';

import { ok, err, Result } from './result';

describe('Option', () => {
  describe('some', () => {
    it('unwraps the value', () => {
      expect(some(42).unwrap()).toBe(42);
    });

    it('unwrapOr ignores the default', () => {
      expect(some(42).unwrapOr(0)).toBe(42);
    });

    it('unwrapOrElse ignores the callback', () => {
      expect(some(42).unwrapOrElse(() => 0)).toBe(42);
    });

    it('maps the value', () => {
      expect(some(21).map((x) => x * 2)).toEqual(some(42));
    });

    it('isSome returns true', () => {
      expect(some(1).isSome()).toBe(true);
    });

    it('isNone returns false', () => {
      expect(some(1).isNone()).toBe(false);
    });

    it('converts to Result', () => {
      expect(some(42).toResult('error')).toEqual(ok(42));
    });
  });

  describe('none', () => {
    it('throws when unwrapped', () => {
      expect(() => none<number>().unwrap()).toThrow('Cannot unwrap None');
    });

    it('unwrapOr returns the fallback', () => {
      expect(none<number>().unwrapOr(42)).toBe(42);
    });

    it('unwrapOrElse evaluates the callback', () => {
      expect(none<number>().unwrapOrElse(() => 42)).toBe(42);
    });

    it('map returns none', () => {
      expect(none<number>().map((x) => x)).toEqual(none());
    });

    it('isSome returns false', () => {
      expect(none<number>().isSome()).toBe(false);
    });

    it('isNone returns true', () => {
      expect(none<number>().isNone()).toBe(true);
    });

    it('converts to Result', () => {
      expect(none<number>().toResult('missing')).toEqual(err('missing'));
    });
  });

  describe('guards', () => {
    it('isSome narrows', () => {
      const value = some(10);

      expect(value.isSome()).toBe(true);
      expect(value.isNone()).toBe(false);
    });

    it('isNone narrows', () => {
      const value = none<number>();

      expect(value.isSome()).toBe(false);
      expect(value.isNone()).toBe(true);
    });
  });

  describe('transpose', () => {
    it('transposes Some(Ok)', () => {
      expect(some(ok(42)).transpose()).toEqual(ok(some(42)));
    });

    it('transposes Some(Err)', () => {
      expect(some(err('boom')).transpose()).toEqual(err('boom'));
    });

    it('transposes Some(None)', () => {
      expect(some(none<number>()).transpose()).toEqual(none());
    });

    it('transposes Some(Some)', () => {
      expect(some(some(42)).transpose()).toEqual(some(42));
    });

    it('throws when transposing None', () => {
      expect(() => none<Result<number, string>>().transpose()).toThrow(
        'Cannot transpose None'
      );
    });

    it('returns itself for plain values', () => {
      expect(some(42).transpose()).toEqual(some(42));
    });
  });
});
