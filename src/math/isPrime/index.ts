export function isPrime(x: number) {
  if (!Number.isInteger(x)) return false;
  if (x <= 3) return x > 1;
  if (x % 2 === 0 || x % 3 === 0) return false;
  for (let i = 5; i * i <= x; i += 6) {
    if (x % i === 0 || x % (i + 2) === 0) return false;
  }
  return true;
}
