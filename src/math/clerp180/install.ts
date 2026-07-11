import { clerp180 } from './index';
import './types';

if (!Math.clerp180) {
  Object.defineProperty(Math, 'clerp180', {
    value: clerp180,
    writable: true,
    configurable: true,
  });
}
