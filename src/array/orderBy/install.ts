import type { OrderBy, RecordType } from '../../types';
import { extendPrototype } from '../../utils.js';
import { orderBy } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  orderBy<T extends RecordType>(
    this: T[],
    ordering: OrderBy<T>[],
    locales?: Intl.LocalesArgument,
    options?: Intl.CollatorOptions
  ) {
    return orderBy(this, ordering, locales, options);
  },
});
