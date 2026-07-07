export function buildKey<T>(row: T, on: (keyof T)[]): string {
  let key = '';
  for (const k of on) {
    key += String(row[k]) + '|';
  }
  return key;
}

export function validateWeighted(values: number[], weights: number[]) {
  if (values.length !== weights.length) {
    throw new Error('values and weights must have the same length');
  }

  if (values.length === 0) {
    return 0;
  }

  let weightSum = 0;
  for (const w of weights) {
    weightSum += w;
  }

  if (weightSum === 0) {
    throw new Error('sum of weights must not be zero');
  }

  return weightSum;
}
