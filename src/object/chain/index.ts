import type { AnyFn, Chain } from '../../types';

function chaining<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, (arg: U, ...args: any) => any>,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  U extends {},
>(fns: T, arg: U) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const patchFns = {} as any;
  for (const fnKey in fns) {
    const fn = fns[fnKey];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    patchFns[fnKey] = (...args: any) => chaining(fns, fn(arg, ...args));
  }
  return {
    ...patchFns,
    get: () => arg,
  } as Chain<T, U>;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const chain = <T extends Record<string, AnyFn>>(fns: T): Chain<T, {}> =>
  chaining(fns, {});
