import type { AnyFn, Uncurry } from '../../types';

export function uncurry<T extends AnyFn>(
  fn: T
): (...args: Parameters<Uncurry<T>>) => ReturnType<Uncurry<T>> {
  return (...args: Parameters<Uncurry<T>>): ReturnType<Uncurry<T>> => {
    let current = fn;
    let i = 0;
    while (typeof current === 'function') {
      const remaining = args.length - i;
      if (current.length > 1 || remaining >= current.length) {
        current = current(...args.slice(i, i + current.length));
        i += current.length;
      } else {
        current = current(args[i]);
        i++;
      }
    }

    return current;
  };
}
