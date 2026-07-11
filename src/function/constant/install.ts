import { constant } from './index';
import './types';

if (!Function.constant) {
  Object.defineProperty(Function, 'constant', {
    value: constant,
    writable: true,
    configurable: true,
  });
}
