import type { RecordType } from '../../types';
import { crossJoin } from './index';
export * from './types';

export function installCrossJoin() {
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
}
