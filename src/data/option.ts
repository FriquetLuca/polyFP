import { Err, err, Ok, ok, Result } from './result';

export type TransposeOptionResult<T> =
  T extends Result<infer U, infer E>
    ? Result<Option<U>, E>
    : T extends Option<infer V>
      ? Option<V>
      : Option<T>;

export abstract class Option<T> {
  abstract isSome(): this is Some<T>;
  abstract isNone(): this is None<T>;
  abstract map<U>(fn: (value: T) => U): Option<U>;
  abstract unwrap(): T;
  abstract unwrapOr(value: T): T;
  abstract unwrapOrElse(fn: () => T): T;
  abstract toResult<Err = unknown>(error: Err): Result<T, Err>;
  abstract transpose(): TransposeOptionResult<T>;
}

export class None<T> extends Option<T> {
  constructor() {
    super();
  }
  isSome(): this is Some<T> {
    return false;
  }
  isNone(): this is None<T> {
    return true;
  }
  map<U>(): Option<U> {
    return this as unknown as Option<U>;
  }
  unwrap(): T {
    throw new Error('Cannot unwrap None');
  }
  unwrapOr<T>(value: T): T {
    return value;
  }
  unwrapOrElse<T>(fn: () => T): T {
    return fn();
  }
  toResult<Err = unknown>(error: Err): Result<T, Err> {
    return err(error);
  }
  transpose(): TransposeOptionResult<T> {
    throw new Error('Cannot transpose None');
  }
}
export class Some<T> extends Option<T> {
  private readonly value: T;
  constructor(value: T) {
    super();
    this.value = value;
  }
  isSome(): this is Some<T> {
    return true;
  }
  isNone(): this is None<T> {
    return false;
  }
  map<U>(fn: (value: T) => U): Option<U> {
    return some(fn(this.value as T));
  }
  unwrap(): T {
    return this.value as T;
  }
  unwrapOr(): T {
    return this.value as T;
  }
  unwrapOrElse(): T {
    return this.value as T;
  }
  toResult<Err = unknown>(): Result<T, Err> {
    return ok(this.value as T);
  }
  transpose(): TransposeOptionResult<T> {
    if (this.value instanceof Some || this.value instanceof None) {
      return this.value as TransposeOptionResult<T>;
    }
    if (this.value instanceof Ok) {
      return ok(some(this.value.unwrap())) as TransposeOptionResult<T>;
    }
    if (this.value instanceof Err) {
      return this.value as TransposeOptionResult<T>;
    }
    return this as unknown as TransposeOptionResult<T>;
  }
}

export const none = <T>(): Option<T> => new None();
export const some = <T>(value: T): Option<T> => new Some(value);

export const fromNullable = <T>(
  value: T | null | undefined
): Option<NonNullable<T>> => (value == null ? none() : some(value));
