import { and } from './index';
import './types';

export function installAnd() {
  if (!Function.and) {
    Object.defineProperty(Function, 'and', {
      value: and,
      writable: true,
      configurable: true,
    });
  }
}
