import type { Currying } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function curry<T extends any[], R>(
  fn: (...args: T) => R,
  depth = 0,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...rest: any[]
): Currying<typeof fn> {
  if (depth < fn.length) {
    const carryOver = (item: T[typeof depth]) => {
      return curry(fn, depth + 1, ...[...rest, item]);
    };
    return carryOver as Currying<T>;
  }
  return fn(...(rest as T)) as Currying<T>;
}
