import { pipe } from './index';
import './types';

if (!Function.pipe) {
  Object.defineProperty(Function, 'pipe', {
    value: pipe,
    writable: true,
    configurable: true,
  });
}
