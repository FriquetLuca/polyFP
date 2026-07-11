import { approximately } from './index';
import './types';

if (!Math.approximately) {
  Object.defineProperty(Math, 'approximately', {
    value: approximately,
    writable: true,
    configurable: true,
  });
}
