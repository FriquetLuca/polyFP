import { invert } from './index';
import './types';

if (!Object.invert) {
  Object.defineProperty(Object, 'invert', {
    value: invert,
    writable: true,
    configurable: true,
  });
}
