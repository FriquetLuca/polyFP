import { parallel } from './index';
import './types';

if (!Function.parallel) {
  Object.defineProperty(Function, 'parallel', {
    value: parallel,
    writable: true,
    configurable: true,
  });
}
