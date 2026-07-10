// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RecordType = Record<string | number | symbol, any>;
export type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };
export type DeepMutable<T> = { -readonly [K in keyof T]: DeepMutable<T[K]> };
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type DeepMerge<T extends object[], Rest = {}> = T extends [
  infer L,
  ...infer R extends object[],
]
  ? DeepMerge<
      R,
      Omit<Rest, keyof L> & {
        [p in keyof L]: p extends keyof Rest ? L[p] | Rest[p] : L[p];
      }
    >
  : Omit<Rest, never>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type OverrideReturnType<F, O> = F extends (...args: infer P) => infer _
  ? (...args: P) => O
  : never;
export type Chain<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, (arg: U, ...args: any) => any>,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  U extends {},
> = {
  [K in keyof T]: OverrideReturnType<
    OmitFirstArg<T[K]>,
    Chain<T, Collapse<U & ReturnType<OmitFirstArg<T[K]>>>>
  >;
} & {
  get: () => U;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFn = (...args: any[]) => any;
export type Collapse<T> = T extends AnyFn
  ? T
  : T extends object
    ? { [K in keyof T]: Collapse<T[K]> }
    : T;

type NewKeyName<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string | number | symbol, any>,
  U extends { key: keyof T; as?: string },
> = U['as'] extends string ? U['as'] : U['key'];
export type TransformKeys<
  T extends object,
  U extends { key: keyof T; as?: string },
> = { [K in keyof T as NewKeyName<T, U & { key: K; as?: string }>]: T[K] };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (arg: any) => any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Tail<T extends any[]> = ((...t: T) => void) extends (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  x: any,
  ...u: infer U
) => void
  ? U
  : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Lookup<T, K extends keyof any, Else = never> = K extends keyof T
  ? T[K]
  : Else;
export type FunctionAsChain<
  F extends [AnyFunction, ...AnyFunction[]],
  G extends AnyFunction[] = Tail<F>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = { [K in keyof F]: (arg: ArgType<F[K]>) => ArgType<Lookup<G, K, any>, any> };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ArgType<F, Else = never> = F extends (arg: infer A) => any
  ? A
  : Else;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LastIndexOfFunctionArray<T extends any[]> = ((
  ...x: T
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => void) extends (y: any, ...z: infer U) => void
  ? U['length']
  : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FirstAsTuple<T extends any[]> = T extends [any, ...infer R]
  ? T extends [...infer F, ...R]
    ? F
    : never
  : never;
export type Currying<F> = F extends (...args: infer Args) => infer Return
  ? Args['length'] extends 0 | 1
    ? F
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Args extends [any, ...infer Rest]
      ? (...args: FirstAsTuple<Args>) => Currying<(...rest: Rest) => Return>
      : never
  : never;
export type Unpack<T> = T extends (infer A)[] ? A : T;
type CurriedArgs<F> = F extends (...args: infer A) => infer R
  ? R extends AnyFn
    ? [...A, ...CurriedArgs<R>]
    : A
  : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CurriedReturn<F> = F extends (...args: any[]) => infer R
  ? R extends AnyFn
    ? CurriedReturn<R>
    : R
  : never;
export type Uncurry<F extends AnyFn> =
  CurriedArgs<F> extends infer A
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      A extends any[]
      ? (...args: A) => CurriedReturn<F>
      : never
    : never;
type OrderByItem<T, K extends keyof T> = T[K] extends string | number | Date
  ? {
      key: K;
      desc?: boolean;
    }
  : {
      key: K;
      compare: (left: T[K], right: T[K]) => number;
    };
export type OrderBy<T, K extends keyof T = keyof T> = K extends keyof T
  ? OrderByItem<T, K>
  : never;
export type QueryResult<
  T extends object,
  Select extends { key: keyof T; as?: string },
> = Collapse<{
  [K in keyof TransformKeys<T, Select>]: TransformKeys<T, Select>[K];
}>;
export type QueryParameters<
  T extends RecordType,
  Select extends { key: keyof T; as?: string },
> = {
  select: Select[];
  where?: (record: T, index: number, array: T[]) => boolean;
  orderBy?: OrderBy<T>[];
  limit?: number;
  offset?: number;
};
export interface AggregateBuilder<T, R> {
  select<K extends string, A>(
    as: K,
    initial: A,
    reduce: (prev: A, current: T) => A
  ): AggregateBuilder<T, R & Record<K, A>>;
  take(): Collapse<R>;
}
