import type { RecordType } from '../../types';

function joinMatches<T, U>(a: T, b: U, on: (keyof T & keyof U)[]): boolean {
  if (on.length === 0) return false;
  for (const key of on) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((a[key] as any) !== b[key]) return false;
  }
  return true;
}

export function leftJoin<T extends RecordType, U extends RecordType>(
  records: T[],
  other: U[],
  ...on: (keyof T & keyof U)[]
) {
  const result: Array<T & Partial<U>> = [];

  for (const left of records) {
    const matchesRows: U[] = [];

    for (const right of other) {
      if (joinMatches(left, right, on)) {
        matchesRows.push(right);
      }
    }

    if (matchesRows.length > 0) {
      for (const r of matchesRows) {
        result.push({ ...left, ...r });
      }
    } else {
      result.push({ ...left });
    }
  }

  return result;
}

export const rightJoin = <T extends RecordType, U extends RecordType>(
  records: T[],
  other: U[],
  ...on: (keyof T & keyof U)[]
) => leftJoin(other, records, ...on);

export function innerJoin<T extends RecordType, U extends RecordType>(
  records: T[],
  other: U[],
  ...on: (keyof T & keyof U)[]
) {
  const result: Array<T & U> = [];

  for (const left of records) {
    for (const right of other) {
      if (joinMatches(left, right, on)) {
        result.push({ ...left, ...right });
      }
    }
  }

  return result;
}

export function crossJoin<T extends RecordType, U extends RecordType>(
  records: T[],
  other: U[]
) {
  const result: Array<T & U> = [];
  for (const left of records) {
    for (const right of other) {
      result.push({ ...left, ...right });
    }
  }
  return result;
}

export function fullJoin<T extends RecordType, U extends RecordType>(
  records: T[],
  other: U[],
  ...on: (keyof T & keyof U)[]
) {
  const result: Array<Partial<T> & Partial<U>> = [];

  const matchedRight = new Set<number>();

  for (const left of records) {
    let hasMatch = false;

    for (let i = 0; i < other.length; i++) {
      const right = other[i];

      if (joinMatches(left, right, on)) {
        result.push({ ...left, ...right });
        matchedRight.add(i);
        hasMatch = true;
      }
    }

    if (!hasMatch) {
      result.push({ ...left });
    }
  }

  for (let i = 0; i < other.length; i++) {
    if (!matchedRight.has(i)) {
      result.push({ ...other[i] });
    }
  }

  return result;
}
