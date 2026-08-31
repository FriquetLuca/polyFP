import type {
  AnyAsyncFunction,
  ArgType,
  AsyncPipeChain,
  AsyncPipeReturn,
} from '../../types';

export {};

declare global {
  interface Function {
    asyncPipe<This extends AnyAsyncFunction, F extends AnyAsyncFunction[]>(
      this: This,
      ...fns: AsyncPipeChain<ReturnType<This>, F> extends F
        ? F
        : AsyncPipeChain<ReturnType<This>, F>
    ): (arg: ArgType<This>) => AsyncPipeReturn<This, F>;
  }
}
