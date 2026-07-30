import type { RecordType } from '../../types';
import { crossJoin } from './index.js';
export type * from './types';

if (!Array.prototype.crossJoin) {
  Object.defineProperty(Array.prototype, 'crossJoin', {
    value<T extends RecordType, U extends RecordType>(
      this: T[],
      records: U[]
    ): (T & U)[] {
      return crossJoin(this, records);
    },
    writable: true,
    configurable: true,
  });
}
