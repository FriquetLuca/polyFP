import { not } from './index';
import './types';

export function installNot() {
  if (!Function.not) {
    Object.defineProperty(Function, 'not', {
      value: not,
      writable: true,
      configurable: true,
    });
  }
}
