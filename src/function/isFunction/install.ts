import { isFunction } from './index';
import './types';

export function installIsFunction() {
  if (!Function.isFunction) {
    Object.defineProperty(Function, 'isFunction', {
      value: isFunction,
      writable: true,
      configurable: true,
    });
  }
}
