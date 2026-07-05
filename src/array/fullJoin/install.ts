import type { RecordType } from '../../types';
import { fullJoin } from './index';
export * from './types';

export function installFullJoin() {
  if (!Array.prototype.fullJoin) {
    Object.defineProperty(Array.prototype, 'fullJoin', {
      value<T extends RecordType, U extends RecordType>(
        this: T[],
        records: U[],
        ...on: (keyof T & keyof U)[]
      ): (Partial<T> & Partial<U>)[] | (T | U)[] {
        return fullJoin(this, records, ...on);
      },
      writable: true,
      configurable: true,
    });
  }
}
