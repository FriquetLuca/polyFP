import type { RecordType } from '../../types';
import { rightJoin } from './index.js';
export type * from './types';

if (!Array.prototype.rightJoin) {
  Object.defineProperty(Array.prototype, 'rightJoin', {
    value<T extends RecordType, U extends RecordType>(
      this: T[],
      records: U[],
      ...on: (keyof T & keyof U)[]
    ): (U & Partial<T>)[] {
      return rightJoin(this, records, ...on);
    },
    writable: true,
    configurable: true,
  });
}
