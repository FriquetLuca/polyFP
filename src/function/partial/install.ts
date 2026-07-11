import { partial } from './index';
import './types';

if (!Function.partial) {
  Object.defineProperty(Function, 'partial', {
    value: partial,
    writable: true,
    configurable: true,
  });
}
