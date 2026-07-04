import { none, some, type Option } from './option';

export interface Ok<T, E> {
  kind: 'ok';
  value: T;
  isOk(): this is Ok<T, E>;
  isError(): this is Err<T, E>;
  map<U>(fn: (value: T) => U): Result<U, E>;
  mapError<F>(ErrFn: (err: E) => F): Result<T, F>;
  unwrap(): T;
  unwrapErr(): never;
  unwrapOr(value: T): T;
  unwrapOrElse(fn: () => T): T;
  toOption(): Option<T>;
}

export interface Err<T, E> {
  kind: 'err';
  error: E;
  isOk(): this is Ok<T, E>;
  isError(): this is Err<T, E>;
  map<U>(fn: (value: T) => U): Result<U, E>;
  mapError<F>(ErrFn: (err: E) => F): Result<T, F>;
  unwrap(): never;
  unwrapErr(): E;
  unwrapOr(value: T): T;
  unwrapOrElse(fn: () => T): T;
  toOption(): Option<T>;
}

export type Result<T, E> = Ok<T, E> | Err<T, E>;

export const ok = <T, E = never>(value: T): Result<T, E> => ({
  kind: 'ok',
  value,
  isOk(): this is Ok<T, E> {
    return true;
  },
  isError(): this is Err<T, E> {
    return false;
  },
  map(fn) {
    return ok(fn(value));
  },
  mapError() {
    return ok(value);
  },
  unwrap() {
    return value;
  },
  unwrapErr() {
    throw new Error('Called unwrapErr() on Ok');
  },
  unwrapOr() {
    return value;
  },
  unwrapOrElse() {
    return value;
  },
  toOption() {
    return some(value);
  },
});

export const err = <E, T = never>(error: E): Result<T, E> => ({
  kind: 'err',
  error,
  isOk(): this is Ok<T, E> {
    return false;
  },
  isError(): this is Err<T, E> {
    return true;
  },
  map() {
    return err(error);
  },
  mapError(fn) {
    return err(fn(error));
  },
  unwrap() {
    throw new Error(`Called unwrap() on Err: ${String(error)}`);
  },
  unwrapErr() {
    return error;
  },
  unwrapOr(value) {
    return value;
  },
  unwrapOrElse(fn) {
    return fn();
  },
  toOption() {
    return none();
  },
});

export function attempt<Args extends unknown[], R, Err = unknown>(
  fn: (...args: Args) => R,
  ...args: Args
): Result<R, Err> {
  try {
    return ok(fn(...args));
  } catch (e) {
    return err<Err>(e as Err);
  }
}

export async function attemptAsync<Args extends unknown[], R, Err = unknown>(
  fn: (...args: Args) => Promise<R>,
  ...args: Args
): Promise<Result<R, unknown>> {
  try {
    return ok(await fn(...args));
  } catch (e) {
    return err<Err>(e as Err);
  }
}

export const safe =
  <Args extends unknown[], R, Err = unknown>(fn: (...args: Args) => R) =>
  (...args: Args): Result<R, Err> =>
    attempt(fn, ...args);

export const safeAsync =
  <Args extends unknown[], R, Err = unknown>(
    fn: (...args: Args) => Promise<R>
  ) =>
  async (...args: Args): Promise<Result<R, unknown>> =>
    await attemptAsync<Args, R, Err>(fn, ...args);
