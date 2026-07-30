import type { RecordType } from '../../types';
import { buildKey } from '../utils.js';

export function innerJoin<T extends RecordType, U extends RecordType>(
  records: T[],
  other: U[],
  ...on: (keyof T & keyof U)[]
): (T & U)[] {
  const result: Array<T & U> = [];
  if (on.length === 0) return [];
  const map = new Map<string, U[]>();
  for (const r of other) {
    const key = buildKey(r, on as (keyof U)[]);
    const bucket = map.get(key);
    if (bucket) bucket.push(r);
    else map.set(key, [r]);
  }
  for (const l of records) {
    const key = buildKey(l, on as (keyof T)[]);
    const matches = map.get(key);
    if (!matches) continue;
    for (const r of matches) {
      result.push({ ...l, ...r });
    }
  }
  return result;
}
