import { None, none, Some, some, type Option } from './option';

export type TransposeResultOption<T, E> =
  T extends Option<infer U> ? Option<Result<U, E>> : Result<T, E>;

export abstract class Result<T, E> {
  abstract isOk(): this is Ok<T, E>;
  abstract isError(): this is Err<T, E>;

  abstract map<U>(fn: (value: T) => U): Result<U, E>;
  abstract mapError<F>(fn: (error: E) => F): Result<T, F>;

  abstract unwrap(): T;
  abstract unwrapErr(): E;

  abstract unwrapOr(value: T): T;
  abstract unwrapOrElse(fn: () => T): T;

  abstract toOption(): Option<T>;

  abstract transpose(): TransposeResultOption<T, E>;
}

export class Ok<T, E> extends Result<T, E> {
  private readonly value: T;
  constructor(value: T) {
    super();
    this.value = value;
  }

  isOk(): this is Ok<T, E> {
    return true;
  }

  isError(): this is Err<T, E> {
    return false;
  }

  map<U>(fn: (value: T) => U): Result<U, E> {
    return ok(fn(this.value));
  }

  mapError<F>(): Result<T, F> {
    return ok(this.value);
  }

  unwrap(): T {
    return this.value;
  }

  unwrapErr(): E {
    throw new Error('Called unwrapErr() on Ok');
  }

  unwrapOr(): T {
    return this.value;
  }

  unwrapOrElse(): T {
    return this.value;
  }

  toOption(): Option<T> {
    return some(this.value);
  }

  transpose(): TransposeResultOption<T, E> {
    if (this.value instanceof Some) {
      return some(ok(this.value.unwrap())) as unknown as TransposeResultOption<
        T,
        E
      >;
    }
    if (this.value instanceof None) {
      return none() as unknown as TransposeResultOption<T, E>;
    }

    return this as unknown as TransposeResultOption<T, E>;
  }
}

export class Err<T, E> extends Result<T, E> {
  private readonly error: E;
  constructor(error: E) {
    super();
    this.error = error;
  }

  isOk(): this is Ok<T, E> {
    return false;
  }

  isError(): this is Err<T, E> {
    return true;
  }

  map<U>(): Result<U, E> {
    return err(this.error);
  }

  mapError<F>(fn: (error: E) => F): Result<T, F> {
    return err(fn(this.error));
  }

  unwrap(): T {
    throw new Error(`Called unwrap() on Err: ${String(this.error)}`);
  }

  unwrapErr(): E {
    return this.error;
  }

  unwrapOr(value: T): T {
    return value;
  }

  unwrapOrElse(fn: () => T): T {
    return fn();
  }

  toOption(): Option<T> {
    return none();
  }

  transpose(): TransposeResultOption<T, E> {
    throw new Error('Cannot transpose Err');
  }
}

export const ok = <T, E = never>(value: T): Result<T, E> => new Ok<T, E>(value);

export const err = <T, E>(error: E): Result<T, E> => new Err<T, E>(error);

export function attempt<Args extends unknown[], R, Err = unknown>(
  fn: (...args: Args) => R,
  ...args: Args
): Result<R, Err> {
  try {
    return ok(fn(...args));
  } catch (e) {
    return err<R, Err>(e as Err);
  }
}

export async function attemptAsync<Args extends unknown[], R, Err = unknown>(
  fn: (...args: Args) => Promise<R>,
  ...args: Args
): Promise<Result<R, unknown>> {
  try {
    return ok(await fn(...args));
  } catch (e) {
    return err<R, Err>(e as Err);
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

export function sequence<T, E>(results: Result<T, E>[]): Result<T[], E> {
  const values: T[] = [];

  for (const result of results) {
    if (!result.isOk()) {
      return result as Result<T[], E>;
    }
    values.push(result.unwrap());
  }

  return ok(values);
}

export function collectErrors<T, E>(results: Result<T, E>[]): E[] {
  const values: E[] = [];

  for (const result of results) {
    if (!result.isOk()) {
      values.push(result.unwrapErr());
    }
  }

  return values;
}
