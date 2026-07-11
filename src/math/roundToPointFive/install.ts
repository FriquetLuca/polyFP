import { roundToPointFive } from './index';
import './types';

if (!Math.roundToPointFive) {
  Object.defineProperty(Math, 'roundToPointFive', {
    value: roundToPointFive,
    writable: true,
    configurable: true,
  });
}
