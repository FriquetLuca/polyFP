import { parallel } from './index';
import './types';

export function installParallel() {
  if (!Function.parallel) {
    Object.defineProperty(Function, 'parallel', {
      value: parallel,
      writable: true,
      configurable: true,
    });
  }
}
