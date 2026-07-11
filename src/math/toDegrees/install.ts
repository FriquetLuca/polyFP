import { toDegrees } from './index';
import './types';

if (!Math.toDegrees) {
  Object.defineProperty(Math, 'toDegrees', {
    value: toDegrees,
    writable: true,
    configurable: true,
  });
}
