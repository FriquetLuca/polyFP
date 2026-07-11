import { once } from './index';
import './types';

if (!Function.once) {
  Object.defineProperty(Function, 'once', {
    value: once,
    writable: true,
    configurable: true,
  });
}
