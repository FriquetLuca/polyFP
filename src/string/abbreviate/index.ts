export function abbreviate(
  value: string,
  maxLength: number,
  exactLength = false
): string {
  if (value.length <= maxLength) return value;
  if (exactLength && maxLength <= 3) return value.slice(0, maxLength);
  return `${value.slice(0, exactLength ? maxLength - 3 : maxLength)}...`;
}
