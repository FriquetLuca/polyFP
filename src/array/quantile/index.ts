export function quantile(values: number[], q: number): number {
  if (values.length === 0) {
    throw new Error('quantile: cannot compute a quantile of an empty dataset');
  }
  if (q < 0 || q > 1) {
    throw new Error('quantile: q must be between 0 and 1');
  }

  const sorted = [...values].sort((a, b) => a - b);
  if (sorted.length === 1) return sorted[0];

  // Position this quantile would sit at, on a 0-indexed scale spanning
  // the whole sorted array — e.g. q=0.5 over 5 items lands at index 2
  // (the median), q=0.25 lands at index 1, etc. Not generally an integer.
  const position = q * (sorted.length - 1);
  const lowerIndex = Math.floor(position);
  const upperIndex = Math.ceil(position);

  if (lowerIndex === upperIndex) return sorted[lowerIndex];

  // linear interpolation between the two bracketing values, weighted by
  // how far `position` sits between them
  const weight = position - lowerIndex;
  return (
    sorted[lowerIndex] + weight * (sorted[upperIndex] - sorted[lowerIndex])
  );
}
