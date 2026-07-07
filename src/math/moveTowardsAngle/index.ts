import { deltaAngle } from '../deltaAngle';
import { moveTowards } from '../moveTowards';

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
