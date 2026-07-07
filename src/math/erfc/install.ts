import { erfc } from './index';
import './types';

export function installErfc() {
  if (!Math.erfc) {
    Object.defineProperty(Math, 'erfc', {
      value: erfc,
      writable: true,
      configurable: true,
    });
  }
}
