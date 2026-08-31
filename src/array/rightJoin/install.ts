import type { RecordType } from '../../types';
import { extendPrototype } from '../../utils.js';
import { rightJoin } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  rightJoin<T extends RecordType, U extends RecordType>(
    this: T[],
    records: U[],
    ...on: (keyof T & keyof U)[]
  ): (U & Partial<T>)[] {
    return rightJoin(this, records, ...on);
  },
});
