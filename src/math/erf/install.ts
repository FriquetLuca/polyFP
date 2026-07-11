import { erf } from './index';
import './types';

if (!Math.erf) {
  Object.defineProperty(Math, 'erf', {
    value: erf,
    writable: true,
    configurable: true,
  });
}
