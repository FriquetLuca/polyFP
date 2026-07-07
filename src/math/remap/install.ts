import { remap } from './index';
import './types';

export function installRemap() {
  if (!Math.remap) {
    Object.defineProperty(Math, 'remap', {
      value: remap,
      writable: true,
      configurable: true,
    });
  }
}
