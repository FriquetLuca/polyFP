export function pascalTriangle(value: number, iterations: number) {
  let result = 1;
  for (let i = 0; i < iterations; i++) {
    result *= (value - i) / (i + 1);
  }
  return result;
}
