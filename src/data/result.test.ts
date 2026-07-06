import { describe, expect, it } from 'vitest';

import {
  Ok,
  Err,
  ok,
  err,
  attempt,
  attemptAsync,
  safe,
  safeAsync,
} from './result';
import { some, none } from './option';

describe('Result', () => {
  describe('Ok', () => {
    it('is Ok', () => {
      const r = ok(42);

      expect(r.isOk()).toBe(true);
      expect(r.isError()).toBe(false);
      expect(r).toBeInstanceOf(Ok);
    });

    it('maps the value', () => {
      const r = ok(21).map((x) => x * 2);

      expect(r.isOk()).toBe(true);
      expect(r.unwrap()).toBe(42);
    });

    it('does not mapError', () => {
      const r = ok(42).mapError((e) => String(e));

      expect(r.isOk()).toBe(true);
      expect(r.unwrap()).toBe(42);
    });

    it('unwrap returns the value', () => {
      expect(ok(42).unwrap()).toBe(42);
    });

    it('unwrapErr throws', () => {
      expect(() => ok(42).unwrapErr()).toThrow('Called unwrapErr() on Ok');
    });

    it('unwrapOr returns the value', () => {
      expect(ok(42).unwrapOr(0)).toBe(42);
    });

    it('unwrapOrElse returns the value', () => {
      expect(ok(42).unwrapOrElse(() => 0)).toBe(42);
    });

    it('converts to Option', () => {
      const o = ok(42).toOption();

      expect(o.isSome()).toBe(true);

      if (o.isSome()) {
        expect(o.unwrap()).toBe(42);
      }
    });
  });

  describe('Err', () => {
    it('is Err', () => {
      const r = err('boom');

      expect(r.isOk()).toBe(false);
      expect(r.isError()).toBe(true);
      expect(r).toBeInstanceOf(Err);
    });

    it('map does nothing', () => {
      const r = err('boom').map((x) => Number(x));

      expect(r.isError()).toBe(true);
      expect(r.unwrapErr()).toBe('boom');
    });

    it('mapError transforms the error', () => {
      const r = err('boom').mapError((e) => e.toUpperCase());

      expect(r.isError()).toBe(true);
      expect(r.unwrapErr()).toBe('BOOM');
    });

    it('unwrap throws', () => {
      expect(() => err('boom').unwrap()).toThrow(
        'Called unwrap() on Err: boom'
      );
    });

    it('unwrapErr returns the error', () => {
      expect(err('boom').unwrapErr()).toBe('boom');
    });

    it('unwrapOr returns fallback', () => {
      expect(err<number, string>('boom').unwrapOr(42)).toBe(42);
    });

    it('unwrapOrElse returns callback value', () => {
      expect(err<number, string>('boom').unwrapOrElse(() => 42)).toBe(42);
    });

    it('converts to None', () => {
      const o = err('boom').toOption();

      expect(o.isNone()).toBe(true);
    });
  });

  describe('transpose', () => {
    it('transposes Ok(Some)', () => {
      const r = ok(some(42)).transpose();

      expect(r.isSome()).toBe(true);

      if (r.isSome()) {
        expect(r.unwrap().isOk()).toBe(true);
        expect(r.unwrap().unwrap()).toBe(42);
      }
    });

    it('transposes Ok(None)', () => {
      const r = ok(none<number>()).transpose();

      expect(r.isNone()).toBe(true);
    });

    it('returns itself for Ok(non-option)', () => {
      const r = ok(42).transpose();

      expect(r).toBeInstanceOf(Ok);
      expect((r as ReturnType<typeof ok<number>>).unwrap()).toBe(42);
    });

    it('throw an error for transpose Err', () => {
      expect(() => err('boom').transpose()).toThrow('Cannot transpose Err');
    });
  });

  describe('attempt', () => {
    it('returns Ok when successful', () => {
      const r = attempt((a: number, b: number) => a + b, 20, 22);

      expect(r.isOk()).toBe(true);
      expect(r.unwrap()).toBe(42);
    });

    it('returns Err when function throws', () => {
      const r = attempt(() => {
        throw new Error('boom');
      });

      expect(r.isError()).toBe(true);

      if (r.isError()) {
        expect(r.unwrapErr()).toBeInstanceOf(Error);
      }
    });
  });

  describe('attemptAsync', () => {
    it('returns Ok when promise resolves', async () => {
      const r = await attemptAsync(
        async (a: number, b: number) => a + b,
        20,
        22
      );

      expect(r.isOk()).toBe(true);
      expect(r.unwrap()).toBe(42);
    });

    it('returns Err when promise rejects', async () => {
      const r = await attemptAsync(async () => {
        throw new Error('boom');
      });

      expect(r.isError()).toBe(true);

      if (r.isError()) {
        expect(r.unwrapErr()).toBeInstanceOf(Error);
      }
    });
  });

  describe('safe', () => {
    it('wraps a function', () => {
      const add = safe((a: number, b: number) => a + b);

      const r = add(20, 22);

      expect(r.isOk()).toBe(true);
      expect(r.unwrap()).toBe(42);
    });

    it('captures thrown errors', () => {
      const fn = safe(() => {
        throw new Error('boom');
      });

      const r = fn();

      expect(r.isError()).toBe(true);
    });
  });

  describe('safeAsync', () => {
    it('wraps async functions', async () => {
      const add = safeAsync(async (a: number, b: number) => a + b);

      const r = await add(20, 22);

      expect(r.isOk()).toBe(true);
      expect(r.unwrap()).toBe(42);
    });

    it('captures async errors', async () => {
      const fn = safeAsync(async () => {
        throw new Error('boom');
      });

      const r = await fn();

      expect(r.isError()).toBe(true);
    });
  });
});
