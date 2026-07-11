import { unlerp } from './index';
import './types';

if (!Math.unlerp) {
  Object.defineProperty(Math, 'unlerp', {
    value: unlerp,
    writable: true,
    configurable: true,
  });
}
