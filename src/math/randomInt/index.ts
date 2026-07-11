export function randomInt(min: number, max: number) {
  const minC = Math.ceil(min);
  const maxF = Math.floor(max);
  return Math.floor(Math.random() * (maxF - minC) + minC);
}
