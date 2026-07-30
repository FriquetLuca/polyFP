import { comparePrimitive } from '../../data/comparePrimitive.js';
import type { OrderBy, RecordType } from '../../types';

export const orderBy = <T extends RecordType>(
  arr: T[],
  ordering: OrderBy<T>[],
  locales?: Intl.LocalesArgument,
  options?: Intl.CollatorOptions
) =>
  [...arr].sort((a, b) => {
    for (const rule of ordering) {
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
