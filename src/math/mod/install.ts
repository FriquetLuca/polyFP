import { mod } from './index';
import './types';

export function installMod() {
  if (!Math.mod) {
    Object.defineProperty(Math, 'mod', {
      value: mod,
      writable: true,
      configurable: true,
    });
  }
}
