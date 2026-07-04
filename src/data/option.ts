import { err, ok, type Result } from './result';

export interface None {
  kind: 'none';
}

export interface Some<T> {
  kind: 'some';
  value: T;
}

export interface Maybe<T> {
  isSome(): this is Some<T>;
  isNone(): this is None;
  map<U>(fn: (value: T) => U): Option<U>;
  unwrap(): T;
  unwrapOr(value: T): T;
  unwrapOrElse(fn: () => T): T;
  toResult<Err = unknown>(error: Err): Result<T, Err>;
}

export type Option<T> = (Some<T> | None) & Maybe<T>;

export const none = <T>(): Option<T> => ({
  kind: 'none',
  isSome(): this is Some<T> {
    return false;
  },
  isNone(): this is None {
    return true;
  },
  map() {
    return none();
  },
  unwrap() {
    throw new Error('Cannot unwrap None');
  },
  unwrapOr(value) {
    return value;
  },
  unwrapOrElse(fn) {
    return fn();
  },
  toResult(error) {
    return err(error);
  },
});

export const some = <T>(value: T): Option<T> => ({
  kind: 'some',
  value,
  isSome(): this is Some<T> {
    return true;
  },
  isNone(): this is None {
    return false;
  },
  map(fn) {
    return some(fn(value));
  },
  unwrap() {
    return value;
  },
  unwrapOr() {
    return value;
  },
  unwrapOrElse() {
    return value;
  },
  toResult() {
    return ok(value);
  },
});

export const fromNullable = <T>(
  value: T | null | undefined
): Option<NonNullable<T>> => (value == null ? none() : some(value));
