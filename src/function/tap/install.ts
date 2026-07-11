import { tap } from './index';
import './types';

if (!Function.tap) {
  Object.defineProperty(Function, 'tap', {
    value: tap,
    writable: true,
    configurable: true,
  });
}
