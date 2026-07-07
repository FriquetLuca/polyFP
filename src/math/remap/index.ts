export const remap = (
  value: number,
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number
) => newMin + ((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin);
