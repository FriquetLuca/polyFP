import { compose } from './index';
export * from './types';

export function installCompose() {
  if (!Function.compose) {
    Object.defineProperty(Function, 'compose', {
      value: compose,
      writable: true,
      configurable: true,
    });
  }
}
