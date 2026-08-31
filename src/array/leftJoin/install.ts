import type { RecordType } from '../../types';
import { extendPrototype } from '../../utils.js';
import { leftJoin } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  leftJoin<T extends RecordType, U extends RecordType>(
    this: T[],
    records: U[],
    ...on: (keyof T & keyof U)[]
  ): Array<T & Partial<U>> {
    return leftJoin(this, records, ...on);
  },
});
