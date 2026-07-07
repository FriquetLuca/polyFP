export function moveTowards(value: number, target: number, maxDelta: number) {
  if (Math.abs(target - value) <= maxDelta) return target;
  return value + Math.sign(target - value) * maxDelta;
}
