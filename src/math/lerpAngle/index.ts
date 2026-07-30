import { repeat } from '../repeat/index.js';
import { saturate } from '../saturate/index.js';

export function lerpAngle(value: number, end: number, time: number) {
  let delta = repeat(end - value, 360);
  if (delta > 180) {
    delta -= 360;
  }
  return value + delta * saturate(time);
}
