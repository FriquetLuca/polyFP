import type { Collapse, TransformKeys } from '../../types';

export function select<
  T extends object,
  U extends keyof T,
  V extends string,
  W extends { key: U; as?: V },
>(obj: T, ...items: W[]): Collapse<TransformKeys<T, W>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = {} as any;
  for (const { key, as } of items) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[as ?? key] = obj[key];
    }
  }
  return result;
}
