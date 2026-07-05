export function buildKey<T>(row: T, on: (keyof T)[]): string {
  let key = '';
  for (const k of on) {
    key += String(row[k]) + '|';
  }
  return key;
}
