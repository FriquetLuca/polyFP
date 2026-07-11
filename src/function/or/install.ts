import { or } from './index';
import './types';

if (!Function.or) {
  Object.defineProperty(Function, 'or', {
    value: or,
    writable: true,
    configurable: true,
  });
}
