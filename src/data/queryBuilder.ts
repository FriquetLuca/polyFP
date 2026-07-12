import type {
  Aggregator,
  Collapse,
  InferSelect,
  OrderBy,
  Mutable,
} from '../types';
import { comparePrimitive } from './comparePrimitive';

const agg = {
  sum: <T>(key: keyof T): Aggregator<T, number, number> => ({
    init: () => 0,
    step: (state, item) => state + Number(item[key] || 0),
    result: (state) => state,
  }),

  avg: <T>(
    key: keyof T
  ): Aggregator<T, { sum: number; count: number }, number> => ({
    init: () => ({ sum: 0, count: 0 }),
    step: (state, item) => {
      state.sum += Number(item[key] || 0);
      state.count += 1;
      return state;
    },
    result: (state) => (state.count ? state.sum / state.count : 0),
  }),

  count: <T>(): Aggregator<T, number, number> => ({
    init: () => 0,
    step: (state) => state + 1,
    result: (state) => state,
  }),

  min: <T>(key: keyof T): Aggregator<T, number, number> => ({
    init: () => Infinity,
    step: (state, item) => Math.min(state, Number(item[key] || 0)),
    result: (state) => (state === Infinity ? 0 : state),
  }),

  max: <T>(key: keyof T): Aggregator<T, number, number> => ({
    init: () => -Infinity,
    step: (state, item) => Math.max(state, Number(item[key] || 0)),
    result: (state) => (state === -Infinity ? 0 : state),
  }),

  custom: <T, TState, TResult>(
    config: Aggregator<T, TState, TResult>
  ): Aggregator<T, TState, TResult> => config,
};

class JoinOnStep<TLeft, TRight, TOutput> {
  private leftData: TLeft[];
  private rightData: TRight[];
  private joinType: 'inner' | 'left' | 'right' | 'outer';
  constructor(
    leftData: TLeft[],
    rightData: TRight[],
    joinType: 'inner' | 'left' | 'right' | 'outer'
  ) {
    this.leftData = leftData;
    this.rightData = rightData;
    this.joinType = joinType;
  }

  on(predicate: (left: TLeft, right: TRight) => boolean): TOutput[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any[] = [];

    if (this.joinType === 'inner') {
      for (const l of this.leftData) {
        for (const r of this.rightData) {
          if (predicate(l, r)) result.push({ ...l, ...r });
        }
      }
    } else if (this.joinType === 'left') {
      for (const l of this.leftData) {
        let matched = false;
        for (const r of this.rightData) {
          if (predicate(l, r)) {
            result.push({ ...l, ...r });
            matched = true;
          }
        }
        if (!matched) result.push({ ...l });
      }
    } else if (this.joinType === 'right') {
      for (const r of this.rightData) {
        let matched = false;
        for (const l of this.leftData) {
          if (predicate(l, r)) {
            result.push({ ...l, ...r });
            matched = true;
          }
        }
        if (!matched) result.push({ ...r });
      }
    } else if (this.joinType === 'outer') {
      const matchedRightIndices = new Set<number>();
      for (const l of this.leftData) {
        let matched = false;
        for (let rIdx = 0; rIdx < this.rightData.length; rIdx++) {
          const r = this.rightData[rIdx];
          if (predicate(l, r)) {
            result.push({ ...l, ...r });
            matched = true;
            matchedRightIndices.add(rIdx);
          }
        }
        if (!matched) {
          result.push({ ...l });
        }
      }
      for (let rIdx = 0; rIdx < this.rightData.length; rIdx++) {
        if (!matchedRightIndices.has(rIdx)) {
          result.push({ ...this.rightData[rIdx] });
        }
      }
    }
    return result as TOutput[];
  }
}

class JoinBuilder<TLeft> {
  private leftData: TLeft[];
  constructor(leftData: TLeft[]) {
    this.leftData = leftData;
  }

  inner<TRight>(rightData: TRight[]) {
    return new JoinOnStep<TLeft, TRight, Collapse<TLeft & TRight>>(
      this.leftData,
      rightData,
      'inner'
    );
  }

  left<TRight>(rightData: TRight[]) {
    return new JoinOnStep<TLeft, TRight, Collapse<TLeft & Partial<TRight>>>(
      this.leftData,
      rightData,
      'left'
    );
  }

  right<TRight>(rightData: TRight[]) {
    return new JoinOnStep<TLeft, TRight, Collapse<Partial<TLeft> & TRight>>(
      this.leftData,
      rightData,
      'right'
    );
  }

  outer<TRight>(rightData: TRight[]) {
    return new JoinOnStep<
      TLeft,
      TRight,
      Collapse<Partial<TLeft> & Partial<TRight>>
    >(this.leftData, rightData, 'outer');
  }

  cross<TRight>(rightData: TRight[]): Collapse<TLeft & TRight>[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any[] = [];
    for (const l of this.leftData) {
      for (const r of rightData) {
        result.push({ ...l, ...r });
      }
    }
    return result as Collapse<TLeft & TRight>[];
  }
}

export class QueryBuilder<TInput, TCurrent> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private initialData: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private pipeline: Array<(data: any[]) => any[]> = [];
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialData: any[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pipeline: Array<(data: any[]) => any[]> = []
  ) {
    this.initialData = initialData;
    this.pipeline = pipeline;
  }

  where(
    predicate: (item: TCurrent) => boolean
  ): QueryBuilder<TInput, TCurrent> {
    return new QueryBuilder<TInput, TCurrent>(this.initialData, [
      ...this.pipeline,
      (data) => data.filter(predicate),
    ]);
  }

  select<const F extends readonly (readonly [keyof TCurrent, string?])[]>(
    fields: F
  ): QueryBuilder<TInput, InferSelect<TCurrent, F>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new QueryBuilder<TInput, any>(this.initialData, [
      ...this.pipeline,
      (data) =>
        data.map((item) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const row: any = {};
          fields.forEach(([key, alias]) => {
            row[alias || key] = item[key];
          });
          return row;
        }),
    ]);
  }

  join<TResult>(
    callback: (j: JoinBuilder<TCurrent>) => TResult[]
  ): QueryBuilder<TInput, TResult> {
    return new QueryBuilder<TInput, TResult>(this.initialData, [
      ...this.pipeline,
      (data) => {
        const joinBuilder = new JoinBuilder(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return callback(joinBuilder as any);
      },
    ]);
  }

  groupBy<
    const K extends readonly (keyof TCurrent)[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const A extends Record<string, Aggregator<TCurrent, any, any>>,
  >(
    keys: K,
    aggFn: (a: typeof agg) => A
  ): QueryBuilder<
    TInput,
    Collapse<
      Pick<TCurrent, K[number]> &
        Mutable<{ [P in keyof A]: ReturnType<A[P]['result']> }>
    >
  > {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new QueryBuilder<TInput, any>(this.initialData, [
      ...this.pipeline,
      (data) => {
        const aggregations = aggFn(agg);
        const groupStates: Record<
          string,
          {
            groupKeyValues: Pick<TCurrent, K[number]>;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            aggStates: Record<string, any>;
          }
        > = {};
        const aggKeys = Object.keys(aggregations);

        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          let compositeKey = '';
          for (let j = 0; j < keys.length; j++) {
            compositeKey += String(item[keys[j]]) + '_||_';
          }

          if (!groupStates[compositeKey]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const aggStates: Record<string, any> = {};
            for (let j = 0; j < aggKeys.length; j++) {
              aggStates[aggKeys[j]] = aggregations[aggKeys[j]].init();
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const groupKeyValues = {} as any;
            for (let j = 0; j < keys.length; j++) {
              groupKeyValues[keys[j]] = item[keys[j]];
            }
            groupStates[compositeKey] = { groupKeyValues, aggStates };
          }

          const states = groupStates[compositeKey].aggStates;
          for (let j = 0; j < aggKeys.length; j++) {
            const k = aggKeys[j];
            states[k] = aggregations[k].step(states[k], item);
          }
        }

        return Object.values(groupStates).map(
          ({ groupKeyValues, aggStates }) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const row = { ...groupKeyValues } as any;
            for (let j = 0; j < aggKeys.length; j++) {
              const k = aggKeys[j];
              row[k] = aggregations[k].result(aggStates[k]);
            }
            return row;
          }
        );
      },
    ]);
  }

  union<U>(
    other: QueryBuilder<TInput, U> | U[]
  ): QueryBuilder<TInput, Collapse<TCurrent | U>> {
    return new QueryBuilder<TInput, Collapse<TCurrent | U>>(this.initialData, [
      ...this.pipeline,
      (data) => {
        const otherData =
          other instanceof QueryBuilder ? other.execute() : other;
        const combined = [...data, ...otherData];

        const seen = new Set<string>();
        return combined.filter((item) => {
          const hash = JSON.stringify(item);
          if (seen.has(hash)) return false;
          seen.add(hash);
          return true;
        });
      },
    ]);
  }

  unionAll<U>(
    other: QueryBuilder<TInput, U> | U[]
  ): QueryBuilder<TInput, Collapse<TCurrent | U>> {
    return new QueryBuilder<TInput, Collapse<TCurrent | U>>(this.initialData, [
      ...this.pipeline,
      (data) => {
        const otherData =
          other instanceof QueryBuilder ? other.execute() : other;
        return [...data, ...otherData];
      },
    ]);
  }

  slice(offset: number, limit?: number): QueryBuilder<TInput, TCurrent> {
    return new QueryBuilder<TInput, TCurrent>(this.initialData, [
      ...this.pipeline,
      (data) => {
        const start = Math.max(0, offset);
        const end =
          limit !== undefined ? start + Math.max(0, limit) : undefined;
        return data.slice(start, end);
      },
    ]);
  }

  orderBy(rules: OrderBy<TCurrent>[]): QueryBuilder<TInput, TCurrent> {
    return new QueryBuilder<TInput, TCurrent>(this.initialData, [
      ...this.pipeline,
      (data) => {
        return [...data].sort((a, b) => {
          for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            const aValue = a[rule.key];
            const bValue = b[rule.key];
            let compareRes;
            if ('compare' in rule) {
              compareRes = rule.compare(aValue, bValue);
            } else {
              compareRes = comparePrimitive(aValue, bValue);
              if (rule.desc) {
                compareRes = -compareRes;
              }
            }
            if (compareRes !== 0) return compareRes;
          }
          return 0;
        });
      },
    ]);
  }

  execute(inputData: TInput[] = []): TCurrent[] {
    let currentData = [...this.initialData, ...inputData];
    for (let i = 0; i < this.pipeline.length; i++) {
      currentData = this.pipeline[i](currentData);
    }
    return currentData as unknown as TCurrent[];
  }
}

export function queryBuilder<T>(data: T[]): QueryBuilder<T, T> {
  return new QueryBuilder<T, T>(data, []);
}
