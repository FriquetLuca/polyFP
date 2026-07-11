import { erfcx } from './index';
import './types';

if (!Math.erfcx) {
  Object.defineProperty(Math, 'erfcx', {
    value: erfcx,
    writable: true,
    configurable: true,
  });
}
