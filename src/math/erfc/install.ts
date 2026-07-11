import { erfc } from './index';
import './types';

if (!Math.erfc) {
  Object.defineProperty(Math, 'erfc', {
    value: erfc,
    writable: true,
    configurable: true,
  });
}
