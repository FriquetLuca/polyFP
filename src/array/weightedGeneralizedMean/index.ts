export function weightedGeneralizedMean(
  values: number[],
  weights: number[],
  p: number
): number {
  if (values.length === 0 || values.length !== weights.length) {
    return 0;
  }

  if (p === Number.POSITIVE_INFINITY) {
    let max = values[0];
    for (let i = 1; i < values.length; i++) {
      if (values[i] > max) {
        max = values[i];
      }
    }
    return max;
  }

  if (p === Number.NEGATIVE_INFINITY) {
    let min = values[0];
    for (let i = 1; i < values.length; i++) {
      if (values[i] < min) {
        min = values[i];
      }
    }
    return min;
  }

  // Weighted geometric mean
  if (p === 0) {
    let weightSum = 0;
    let logSum = 0;

    for (let i = 0; i < values.length; i++) {
      weightSum += weights[i];
      logSum += weights[i] * Math.log(values[i]);
    }

    return weightSum === 0 ? 0 : Math.exp(logSum / weightSum);
  }

  let numerator = 0;
  let weightSum = 0;

  for (let i = 0; i < values.length; i++) {
    numerator += weights[i] * Math.pow(values[i], p);
    weightSum += weights[i];
  }

  if (weightSum === 0) {
    return 0;
  }

  return Math.pow(numerator / weightSum, 1 / p);
}
