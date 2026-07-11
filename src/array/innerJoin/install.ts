import type { RecordType } from '../../types';
import { innerJoin } from './index';
export * from './types';

if (!Array.prototype.innerJoin) {
  Object.defineProperty(Array.prototype, 'innerJoin', {
    value<T extends RecordType, U extends RecordType>(
      this: T[],
      records: U[],
      ...on: (keyof T & keyof U)[]
    ): (T & U)[] {
      return innerJoin(this, records, ...on);
    },
    writable: true,
    configurable: true,
  });
}
