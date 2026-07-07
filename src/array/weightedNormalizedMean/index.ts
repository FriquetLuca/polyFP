export function weightedNormalizedMean(
  values: number[],
  weights: number[]
): number {
  let wSum = 0;
  let sum = 0;

  for (let i = 0; i < values.length; i++) {
    const w = weights[i] ?? 0;
    sum += values[i] * w;
    wSum += Math.abs(w);
  }

  if (wSum === 0) {
    throw new Error('absolute sum of weights must not be zero');
  }

  return wSum === 0 ? 0 : sum / wSum;
}
