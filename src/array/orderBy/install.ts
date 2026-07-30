import type { OrderBy, RecordType } from '../../types';
import { orderBy } from './index.js';

export type * from './types';

if (!Array.prototype.orderBy) {
  Object.defineProperty(Array.prototype, 'orderBy', {
    value<T extends RecordType>(
      this: T[],
      ordering: OrderBy<T>[],
      locales?: Intl.LocalesArgument,
      options?: Intl.CollatorOptions
    ) {
      return orderBy(this, ordering, locales, options);
    },
    writable: true,
    configurable: true,
  });
}
