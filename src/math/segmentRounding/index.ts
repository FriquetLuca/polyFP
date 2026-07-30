export function segmentRounding(
  x: number,
  segments: number,
  precision: number = 2
) {
  const segmented = Math.floor(Math.abs(x) * segments) / segments;
  const powTen = Math.pow(10, precision);
  return (Math.sign(x) * Math.floor(segmented * powTen)) / powTen;
}
