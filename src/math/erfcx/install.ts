import { erfcx } from './index';
import './types';

export function installErfcx() {
  if (!Math.erfcx) {
    Object.defineProperty(Math, 'erfcx', {
      value: erfcx,
      writable: true,
      configurable: true,
    });
  }
}
