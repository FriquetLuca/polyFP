import { clamp } from '../clamp';

export const repeat = (t: number, a: number) =>
  clamp(t - Math.floor(t / a) * a, 0, a);
