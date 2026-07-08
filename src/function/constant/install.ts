import { constant } from './index';
import './types';

export function installConstant() {
  if (!Function.constant) {
    Object.defineProperty(Function, 'constant', {
      value: constant,
      writable: true,
      configurable: true,
    });
  }
}
