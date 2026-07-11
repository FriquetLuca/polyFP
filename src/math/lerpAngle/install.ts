import { lerpAngle } from './index';
import './types';

if (!Math.lerpAngle) {
  Object.defineProperty(Math, 'lerpAngle', {
    value: lerpAngle,
    writable: true,
    configurable: true,
  });
}
