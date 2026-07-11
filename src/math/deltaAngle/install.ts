import { deltaAngle } from './index';
import './types';

if (!Math.deltaAngle) {
  Object.defineProperty(Math, 'deltaAngle', {
    value: deltaAngle,
    writable: true,
    configurable: true,
  });
}
