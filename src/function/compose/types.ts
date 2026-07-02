import type {
  AnyFunction,
  ArgType,
  FunctionAsChain,
  LastIndexOfFunctionArray,
} from '../../types';

export {};

declare global {
  interface FunctionConstructor {
    compose<F extends [AnyFunction, ...AnyFunction[]]>(
      ...fns: F & FunctionAsChain<F>
    ): (arg: ArgType<F[0]>) => ReturnType<F[LastIndexOfFunctionArray<F>]>;
  }
}
