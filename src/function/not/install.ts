import { not } from './index';
import './types';

if (!Function.not) {
  Object.defineProperty(Function, 'not', {
    value: not,
    writable: true,
    configurable: true,
  });
}
