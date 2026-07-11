import { lerp } from './index';
import './types';

if (!Math.lerp) {
  Object.defineProperty(Math, 'lerp', {
    value: lerp,
    writable: true,
    configurable: true,
  });
}
