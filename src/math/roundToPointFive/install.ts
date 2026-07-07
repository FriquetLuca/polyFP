import { roundToPointFive } from './index';
import './types';

export function installRoundToPointFive() {
  if (!Math.roundToPointFive) {
    Object.defineProperty(Math, 'roundToPointFive', {
      value: roundToPointFive,
      writable: true,
      configurable: true,
    });
  }
}
