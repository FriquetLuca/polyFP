import { flip } from './index';
import './types';

if (!Function.flip) {
  Object.defineProperty(Function, 'flip', {
    value: flip,
    writable: true,
    configurable: true,
  });
}
