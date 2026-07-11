import { curry } from './index';
import './types';

if (!Function.curry) {
  Object.defineProperty(Function, 'curry', {
    value: curry,
    writable: true,
    configurable: true,
  });
}
