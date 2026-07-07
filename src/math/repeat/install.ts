import { repeat } from './index';
import './types';

export function installRepeat() {
  if (!Math.repeat) {
    Object.defineProperty(Math, 'repeat', {
      value: repeat,
      writable: true,
      configurable: true,
    });
  }
}
