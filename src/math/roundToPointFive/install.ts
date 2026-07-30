import { roundToPointFive } from './index.js';
export type * from './types';

if (!Math.roundToPointFive) {
  Object.defineProperty(Math, 'roundToPointFive', {
    value: roundToPointFive,
    writable: true,
    configurable: true,
  });
}
