export type SettledResult<R> =
  { status: 'fulfilled'; value: R } | { status: 'rejected'; reason: unknown };
export type IntegerArray =
  | Int8Array
  | Uint8Array
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | BigInt64Array
  | BigUint64Array;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RecordType = Record<string | number | symbol, any>;
export type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };
export type Mutable<T> = { -readonly [K in keyof T]: T[K] };
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
export type ProjectionSpec<T> = Record<string, keyof T | ((row: T) => unknown)>;
export type ProjectedRow<T, S extends ProjectionSpec<T>> = Collapse<{
  [K in keyof S]: S[K] extends (row: T) => infer R
    ? R
    : S[K] extends keyof T
      ? T[S[K]]
      : never;
}>;
export interface Pool<T> {
  acquire(): Promise<T>;
  release(resource: T): void;
  readonly available: number;
  readonly inUse: number;
}
export type Collapse<T> = T extends AnyFn
  ? T
  : T extends object
    ? { [K in keyof T]: Collapse<T[K]> }
    : T;
export type UnpivotedRow<T, I extends keyof T, V extends keyof T> = Pick<T, I> &
  {
    [K in V]: { key: K; value: T[K] };
  }[V];
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
export type Awaitable<T> = T | Promise<T>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyAsyncFunction = (arg: any) => Awaitable<any>;
export type PipeChain<PrevReturn, Fns extends AnyFunction[]> = Fns extends [
  infer F1,
  ...infer FRest,
]
  ? F1 extends (arg: PrevReturn) => infer R
    ? FRest extends AnyFunction[]
      ? [F1, ...PipeChain<R, FRest>]
      : [F1]
    : never
  : [];

export type PipeReturn<This extends AnyFunction, Fns extends AnyFunction[]> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Fns extends [...infer _, infer Last extends AnyFunction]
    ? ReturnType<Last>
    : ReturnType<This>;
export type AsyncPipeChain<
  PrevReturn,
  Fns extends AnyAsyncFunction[],
> = Fns extends [
  infer F1 extends AnyAsyncFunction,
  ...infer FRest extends AnyAsyncFunction[],
]
  ? F1 extends (arg: Awaited<PrevReturn>) => infer R
    ? [F1, ...AsyncPipeChain<R, FRest>]
    : [(arg: Awaited<PrevReturn>) => unknown, ...FRest] // shape-preserving mismatch marker
  : [];

export type AsyncPipeReturn<
  This extends AnyAsyncFunction,
  Fns extends AnyAsyncFunction[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = Fns extends [...infer _, infer Last extends AnyAsyncFunction]
  ? Promise<Awaited<ReturnType<Last>>>
  : Promise<Awaited<ReturnType<This>>>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Tail<T extends any[]> = ((...t: T) => void) extends (
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Aggregator<T, TState = any, TResult = any> {
  init: () => TState;
  step: (state: TState, item: T) => TState;
  result: (state: TState) => TResult;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AggregateBuilder<T, R = {}> {
  select<K extends string, A>(
    as: K,
    initial: A,
    reduce: (prev: A, current: T) => A
  ): AggregateBuilder<T, R & Record<K, A>>;
  take(): Collapse<R>;
}
export interface TextPosition {
  line: number;
  char: number;
}
export type InferSelect<
  T,
  F extends readonly (readonly [keyof T, string?])[],
> = Collapse<{
  [
    K in F[number] as K[1] extends string
      ? K[1]
      : K[0] extends string | number
        ? K[0]
        : never
  ]: T[K[0] & keyof T];
}>;
type KeyOf<Row> = Row extends { key: infer K extends PropertyKey } ? K : never;

// Extract the `value` type correlated with one specific key literal.
type ValueOfKey<Row, K> = Row extends { key: K; value: infer V } ? V : never;

// One aggregator per possible key, each typed to that key's own value type.
export type PivotAggregators<Row> = {
  [K in KeyOf<Row>]: (values: ValueOfKey<Row, K>[]) => unknown;
};

export type PivotedRow<
  Row,
  I extends keyof Row,
  A extends PivotAggregators<Row>,
> = Pick<Row, I> & {
  [K in keyof A]: ReturnType<A[K]>;
};
