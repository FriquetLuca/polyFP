import type {
  AnyFunction,
  FunctionAsChain,
  LastIndexOfFunctionArray,
  Unpack,
} from '../../types';

export const pipe =
  <F extends [AnyFunction, ...Array<AnyFunction>]>(
    ...fns: F & FunctionAsChain<F>
  ) =>
  (arg: Unpack<Parameters<F[0]>>) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    (fns as Function[]).reduce((acc, fn) => fn(acc), arg) as ReturnType<
      F[LastIndexOfFunctionArray<F>]
    >;
