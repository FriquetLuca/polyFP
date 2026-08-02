export function nth<T>(array: T[], pos: number) {
  const len = array.length;
  if (len === 0) return;
  pos += pos < 0 ? len : 0;
  return pos < len ? array[pos] : undefined;
}
