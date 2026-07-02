import type {
  AnyFunction,
  FunctionAsChain,
  LastIndexOfFunctionArray,
  Unpack,
} from '../../types';

export {};

declare global {
  interface FunctionConstructor {
    pipe<F extends [AnyFunction, ...AnyFunction[]]>(
      arg: Unpack<Parameters<F[0]>>,
      ...fns: F & FunctionAsChain<F>
    ): ReturnType<F[LastIndexOfFunctionArray<F>]>;
  }
}
