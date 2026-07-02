import { uncurry } from './index';
import './types';

export function installUncurry() {
  if (!Function.uncurry) {
    Object.defineProperty(Function, 'uncurry', {
      value: uncurry,
      writable: true,
      configurable: true,
    });
  }
}
