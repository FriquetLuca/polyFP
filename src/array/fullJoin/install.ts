import type { RecordType } from '../../types';
import { extendPrototype } from '../../utils.js';
import { fullJoin } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  fullJoin<T extends RecordType, U extends RecordType>(
    this: T[],
    records: U[],
    ...on: (keyof T & keyof U)[]
  ): (Partial<T> & Partial<U>)[] | (T | U)[] {
    return fullJoin(this, records, ...on);
  },
});
