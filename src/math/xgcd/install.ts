import { xgcd } from './index';
import './types';

export function installXGCD() {
  if (!Math.xgcd) {
    Object.defineProperty(Math, 'xgcd', {
      value: xgcd,
      writable: true,
      configurable: true,
    });
  }
}
