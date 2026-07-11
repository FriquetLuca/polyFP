export function randomIntInclusive(min: number, max: number) {
  const minC = Math.ceil(min);
  const maxF = Math.floor(max);
  return Math.floor(Math.random() * (maxF - minC + 1) + minC);
}
