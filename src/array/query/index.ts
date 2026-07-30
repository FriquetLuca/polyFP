import { comparePrimitive } from '../../data/comparePrimitive.js';
import { select } from '../../object/select/index.js';
import type { RecordType, QueryResult, QueryParameters } from '../../types';

export function query<
  T extends RecordType,
  Select extends { key: keyof T; as?: string },
>(
  arr: T[],
  q: QueryParameters<T, Select>,
  locales?: Intl.LocalesArgument,
  options?: Intl.CollatorOptions
): QueryResult<T, Select>[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any[] = [];
  const where = q.where ?? (() => true);
  const offset = q.offset ?? 0;
  for (let i = 0; i < arr.length; i++) {
    if (where(arr[i], i, arr)) {
      result.push(arr[i]);
    } else {
      continue;
    }
    // No ordering
    // Has limit
    // Limit alongside offset is the size of the result
    // Then, early exit
    if (
      q.orderBy === undefined &&
      q.limit !== undefined &&
      q.limit + offset === result.length
    ) {
      break;
    }
  }
  if (q.orderBy) {
    result.sort((a, b) => {
      for (const rule of q.orderBy!) {
        const aValue = a[rule.key];
        const bValue = b[rule.key];
        let compare;
        if ('compare' in rule) {
          compare = rule.compare(aValue, bValue);
        } else {
          const compared = comparePrimitive(aValue, bValue, locales, options);
          compare = (rule.desc ?? false) ? -compared : compared;
        }
        if (compare !== 0) return compare;
      }
      return 0;
    });
  }
  return result
    .map((v) => select(v, ...q.select))
    .slice(
      offset,
      q.limit ? offset + q.limit : undefined
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any;
}
