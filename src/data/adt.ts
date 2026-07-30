import type { Collapse } from '../types';
import type { StandardSchemaV1 } from '@standard-schema/spec';
import { err, ok, type Result } from './result.js';

export type ADTConstructors<T, Tag extends string | number> = {
  [K in keyof T]: (value: Partial<T[K]>) => Collapse<Record<Tag, K> & T[K]>;
};
export type ADTValues<
  Tag extends string | number,
  T extends Record<string | number, object>,
> = { [K in keyof T]: Collapse<Record<Tag, K> & T[K]> }[keyof T];

export function createADT<Tag extends string | number>(tag: Tag) {
  return <T extends Record<string | number, object>>(
    shape: T
  ): {
    new: ADTConstructors<T, Tag>;
    match<R = void>(
      value: Collapse<ADTValues<Tag, T>>,
      on: { [K in keyof T]: (value: Collapse<Record<Tag, K> & T[K]>) => R }
    ): R;
    is(value: Collapse<ADTValues<Tag, T>>, kind: keyof T): boolean;
  } => {
    const result = {} as ADTConstructors<T, Tag>;

    for (const key in shape) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result[key] = ((value: any) => ({
        [tag]: key,
        ...shape[key],
        ...value,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      })) as any;
    }

    return {
      new: result,
      match(value, on) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return on[value[tag] as keyof typeof on](value as any);
      },
      is(value, kind) {
        return value[tag] === kind;
      },
    };
  };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InferSchema<S> = S extends StandardSchemaV1<any, infer O> ? O : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SchemaShape = Record<string | number, StandardSchemaV1<any, any>>;

export type SchemaADTValues<
  Tag extends string | number,
  T extends SchemaShape,
> = {
  [K in keyof T]: Collapse<InferSchema<T[K]> & Record<Tag, K>>;
}[keyof T];

export function schemaADT<Tag extends string | number>(tag: Tag) {
  return <T extends SchemaShape>(shape: T) => {
    const constructors = {} as {
      [K in keyof T]: (
        value: Partial<InferSchema<T[K]>>
      ) => Result<
        Collapse<InferSchema<T[K]> & Record<Tag, K>>,
        StandardSchemaV1.Issue[]
      >;
    };

    for (const key in shape) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const schema = shape[key] as StandardSchemaV1<any, any>;

      constructors[key] = ((value: unknown) => {
        const result = schema['~standard'].validate(value);

        if (result instanceof Promise) {
          throw new Error(
            'Async schema validation not supported in constructor'
          );
        }

        if ('issues' in result) {
          return err(result.issues!);
        }

        return ok({
          [tag]: key,
          ...result.value,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any;
    }

    return {
      new: constructors,

      match<R>(
        value: SchemaADTValues<Tag, T>,
        on: {
          [K in keyof T]: (
            value: Extract<SchemaADTValues<Tag, T>, Record<Tag, K>>
          ) => R;
        }
      ): R {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return on[value[tag] as keyof T](value as any);
      },

      is(value: SchemaADTValues<Tag, T>, kind: keyof T): boolean {
        return value[tag] === kind;
      },
    };
  };
}
