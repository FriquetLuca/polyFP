import type {
  AnyFunction,
  ArgType,
  FunctionAsChain,
  LastIndexOfFunctionArray,
} from '../../types';

export function compose<F extends [AnyFunction, ...Array<AnyFunction>]>(
  ...fns: F & FunctionAsChain<F>
): (arg: ArgType<F[0]>) => ReturnType<F[LastIndexOfFunctionArray<F>]> {
  return (arg: ArgType<F[0]>) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    (fns as Function[]).reduce((acc, fn) => fn(acc), arg) as ReturnType<
      F[LastIndexOfFunctionArray<F>]
    >;
}
