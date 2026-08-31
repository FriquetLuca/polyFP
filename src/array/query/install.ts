import type { RecordType, QueryParameters, QueryResult } from '../../types';
import { extendPrototype } from '../../utils.js';
import { query } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  query<T extends RecordType, Select extends { key: keyof T; as?: string }>(
    this: T[],
    q: QueryParameters<T, Select>,
    locales?: Intl.LocalesArgument,
    options?: Intl.CollatorOptions
  ): QueryResult<T, Select>[] {
    return query(this, q, locales, options);
  },
});
