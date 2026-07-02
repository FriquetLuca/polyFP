import { omit } from './index';
import './types';

export function installOmit() {
  if (!Object.omit) {
    Object.defineProperty(Object, 'omit', {
      value: omit,
      writable: true,
      configurable: true,
    });
  }
}
