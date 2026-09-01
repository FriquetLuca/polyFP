export function compareUuidv7(a: string, b: string): number {
  const aHex = a.replace(/-/g, '');
  const bHex = b.replace(/-/g, '');

  if (aHex.length !== bHex.length) {
    throw new Error('compareUuidv7: both values must be well-formed UUIDs');
  }

  if (aHex < bHex) return -1;
  if (aHex > bHex) return 1;
  return 0;
}
