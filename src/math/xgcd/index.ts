export function xgcd(a: number, b: number) {
  if (!Number.isInteger(a) || !Number.isInteger(b))
    throw new Error('No gcd exists for non integers');
  let oldR = a;
  let r = b;

  let oldS = 1;
  let s = 0;

  let oldT = 0;
  let t = 1;

  while (r !== 0) {
    const q = Math.floor(oldR / r);

    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
    [oldT, t] = [t, oldT - q * t];
  }

  return {
    gcd: oldR,
    x: oldS,
    y: oldT,
  };
}
