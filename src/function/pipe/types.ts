import type { AnyFunction, ArgType, PipeChain, PipeReturn } from '../../types';

export {};

declare global {
  interface Function {
    pipe<This extends AnyFunction, F extends AnyFunction[]>(
      this: This,
      ...fns: F & PipeChain<ReturnType<This>, F>
    ): (arg: ArgType<This>) => PipeReturn<This, F>;
  }
}
