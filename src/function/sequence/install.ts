import { sequence } from './index';
import './types';

if (!Function.sequence) {
  Object.defineProperty(Function, 'sequence', {
    value: sequence,
    writable: true,
    configurable: true,
  });
}
