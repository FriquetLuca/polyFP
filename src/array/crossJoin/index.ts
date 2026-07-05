import type { RecordType } from '../../types';

export function crossJoin<T extends RecordType, U extends RecordType>(
  records: T[],
  other: U[]
): (T & U)[] {
  const result: Array<T & U> = new Array(records.length * other.length);
  let idx = 0;
  for (const l of records) {
    for (const r of other) {
      result[idx++] = { ...l, ...r };
    }
  }
  return result;
}
