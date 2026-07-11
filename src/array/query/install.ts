import type { RecordType, QueryParameters, QueryResult } from '../../types';
import { query } from './index';

export * from './types';

if (!Array.prototype.query) {
  Object.defineProperty(Array.prototype, 'query', {
    value<T extends RecordType, Select extends { key: keyof T; as?: string }>(
      this: T[],
      q: QueryParameters<T, Select>,
      locales?: Intl.LocalesArgument,
      options?: Intl.CollatorOptions
    ): QueryResult<T, Select>[] {
      return query(this, q, locales, options);
    },
    writable: true,
    configurable: true,
  });
}
