import type { RecordType } from '../../types';
import { leftJoin } from './index.js';
export type * from './types';

if (!Array.prototype.leftJoin) {
  Object.defineProperty(Array.prototype, 'leftJoin', {
    value<T extends RecordType, U extends RecordType>(
      this: T[],
      records: U[],
      ...on: (keyof T & keyof U)[]
    ): Array<T & Partial<U>> {
      return leftJoin(this, records, ...on);
    },
    writable: true,
    configurable: true,
  });
}
