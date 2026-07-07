export function clerp180(a: number, b: number, t: number): number {
  if (b - a < -180.0) {
    return a + (360 - a + b) * t;
  } else if (b - a > 180.0) {
    return a + -(360 - b + a) * t;
  }
  return a + (b - a) * t;
}
