import type { RecordType } from '../../types';
import { extendPrototype } from '../../utils.js';
import { crossJoin } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  crossJoin<T extends RecordType, U extends RecordType>(
    this: T[],
    records: U[]
  ): (T & U)[] {
    return crossJoin(this, records);
  },
});
