export function deltaAngle(current: number, target: number): number {
  const diff = target - current;
  const angle = diff - Math.floor(diff / 360) * 360;
  const normalAngle = angle > 360 ? 360 : angle < 0 ? 0 : angle;
  return normalAngle > 180 ? normalAngle - 360 : normalAngle;
}
