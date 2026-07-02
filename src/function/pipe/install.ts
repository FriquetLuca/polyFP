import { pipe } from './index';
import './types';

export function installPipe() {
  if (!Function.pipe) {
    Object.defineProperty(Function, 'pipe', {
      value: pipe,
      writable: true,
      configurable: true,
    });
  }
}
