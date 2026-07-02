import type {
  AnyFunction,
  FunctionAsChain,
  LastIndexOfFunctionArray,
  Unpack,
} from '../../types';

export function pipe<F extends [AnyFunction, ...Array<AnyFunction>]>(
  arg: Unpack<Parameters<F[0]>>,
  ...fns: F & FunctionAsChain<F>
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  return (fns as Function[]).reduce((acc, fn) => fn(acc), arg) as ReturnType<
    F[LastIndexOfFunctionArray<F>]
  >;
}
