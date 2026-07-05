import type { RecordType } from '../../types';
import { buildKey } from '../utils';

export function leftJoin<T extends RecordType, U extends RecordType>(
  records: T[],
  other: U[],
  ...on: (keyof T & keyof U)[]
): Array<T & Partial<U>> {
  if (on.length === 0) {
    return [...records];
  }
  const result: Array<T & Partial<U>> = [];
  const map = new Map<string, U[]>();
  for (const r of other) {
    const key = buildKey(r, on as (keyof U)[]);
    const bucket = map.get(key);
    if (bucket) bucket.push(r);
    else map.set(key, [r]);
  }
  for (const left of records) {
    const key = buildKey(left, on as (keyof T)[]);
    const matches = map.get(key);
    if (matches) {
      for (const r of matches) {
        result.push({ ...left, ...r });
      }
    } else {
      result.push({ ...left });
    }
  }
  return result;
}
