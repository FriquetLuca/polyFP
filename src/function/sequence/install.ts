import { sequence } from './index';
import './types';

export function installSequence() {
  if (!Function.sequence) {
    Object.defineProperty(Function, 'sequence', {
      value: sequence,
      writable: true,
      configurable: true,
    });
  }
}
