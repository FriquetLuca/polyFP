import type { AnyAsyncFunction, ArgType } from '../../types';

type AsyncPipeChain<PrevReturn, Fns extends AnyAsyncFunction[]> = Fns extends [
  infer F1 extends AnyAsyncFunction,
  ...infer FRest extends AnyAsyncFunction[],
]
  ? F1 extends (arg: Awaited<PrevReturn>) => infer R
    ? [F1, ...AsyncPipeChain<R, FRest>]
    : [(arg: Awaited<PrevReturn>) => unknown, ...FRest] // shape-preserving mismatch marker
  : [];

type AsyncPipeReturn<
  First extends AnyAsyncFunction,
  Rest extends AnyAsyncFunction[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = Rest extends [...infer _, infer Last extends AnyAsyncFunction]
  ? Promise<Awaited<ReturnType<Last>>>
  : Promise<Awaited<ReturnType<First>>>;

export function pipeAsync<
  First extends AnyAsyncFunction,
  Rest extends AnyAsyncFunction[],
>(
  first: First,
  ...rest: AsyncPipeChain<ReturnType<First>, Rest> extends Rest
    ? Rest
    : AsyncPipeChain<ReturnType<First>, Rest>
): (arg: ArgType<First>) => AsyncPipeReturn<First, Rest> {
  return async function (arg: unknown): Promise<unknown> {
    let result: unknown = await first(arg);
    for (const fn of rest) {
      result = await fn(result);
    }
    return result;
  } as (arg: ArgType<First>) => AsyncPipeReturn<First, Rest>;
}
