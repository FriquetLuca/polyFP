import { saturate } from './index';
import './types';

export function installSaturate() {
  if (!Math.saturate) {
    Object.defineProperty(Math, 'saturate', {
      value: saturate,
      writable: true,
      configurable: true,
    });
  }
}
