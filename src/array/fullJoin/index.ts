import type { RecordType } from '../../types';
import { buildKey } from '../utils';

export function fullJoin<T extends RecordType, U extends RecordType>(
  records: T[],
  other: U[],
  ...on: (keyof T & keyof U)[]
): (Partial<T> & Partial<U>)[] | (T | U)[] {
  if (on.length === 0) {
    return [...records, ...other];
  }
  const result: Array<Partial<T> & Partial<U>> = [];
  const map = new Map<string, { row: U; index: number }[]>();
  for (let i = 0; i < other.length; i++) {
    const row = other[i];
    const key = buildKey(row, on as (keyof U)[]);
    const bucket = map.get(key);
    if (bucket) bucket.push({ row, index: i });
    else map.set(key, [{ row, index: i }]);
  }
  const matchedRight = new Set<number>();
  for (const l of records) {
    const key = buildKey(l, on as (keyof T)[]);
    const matches = map.get(key);
    if (matches && matches.length > 0) {
      for (const m of matches) {
        matchedRight.add(m.index);
        result.push({ ...l, ...m.row });
      }
    } else {
      result.push({ ...l });
    }
  }
  for (let i = 0; i < other.length; i++) {
    if (!matchedRight.has(i)) {
      result.push({ ...other[i] });
    }
  }
  return result;
}
