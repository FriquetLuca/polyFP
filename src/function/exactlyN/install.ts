import { exactlyN } from './index';
import './types';

if (!Function.exactlyN) {
  Object.defineProperty(Function, 'exactlyN', {
    value: exactlyN,
    writable: true,
    configurable: true,
  });
}
