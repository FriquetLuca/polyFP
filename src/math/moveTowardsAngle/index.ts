import { deltaAngle } from '../deltaAngle/index.js';
import { moveTowards } from '../moveTowards/index.js';

export function moveTowardsAngle(
  value: number,
  target: number,
  maxDelta: number
) {
  const dAngle = deltaAngle(value, target);
  if (-maxDelta < dAngle && dAngle < maxDelta) {
    return target;
  }
  return moveTowards(value, value + dAngle, maxDelta);
}
