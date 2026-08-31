import type { RecordType } from '../../types';
import { extendPrototype } from '../../utils.js';
import { innerJoin } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  innerJoin<T extends RecordType, U extends RecordType>(
    this: T[],
    records: U[],
    ...on: (keyof T & keyof U)[]
  ): (T & U)[] {
    return innerJoin(this, records, ...on);
  },
});
