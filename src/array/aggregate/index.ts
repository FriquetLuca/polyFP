import type { AggregateBuilder } from '../../types';

export function aggregate<T>(items: T[]): AggregateBuilder<T> {
  const mappers: {
    as: string;
    initial: unknown;
    reduce: (prev: unknown, current: T) => unknown;
  }[] = [];

  const builder = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    select(as: string, initial: unknown, reduce: any) {
      mappers.push({ as, initial, reduce });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return builder as any;
    },

    take() {
      const result: Record<string, unknown> = {};

      for (const mapper of mappers) {
        result[mapper.as] = mapper.initial;
      }

      for (const item of items) {
        for (const mapper of mappers) {
          result[mapper.as] = mapper.reduce(result[mapper.as], item);
        }
      }

      return result;
    },
  };
  return builder as AggregateBuilder<T>;
}
