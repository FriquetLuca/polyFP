export function inRange(n: number, end: number): boolean;
export function inRange(
  n: number,
  start: number,
  end: number | undefined = undefined
): boolean {
  if (end) {
    return n >= start && n < end;
  }
  return n >= 0 && n < start;
}
