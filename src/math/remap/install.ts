import { remap } from './index';
import './types';

if (!Math.remap) {
  Object.defineProperty(Math, 'remap', {
    value: remap,
    writable: true,
    configurable: true,
  });
}
