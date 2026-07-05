import type { RecordType } from '../../types';
import { leftJoin } from '../leftJoin/index';

export const rightJoin = <T extends RecordType, U extends RecordType>(
  records: T[],
  other: U[],
  ...on: (keyof T & keyof U)[]
): (U & Partial<T>)[] => leftJoin(other, records, ...on);
