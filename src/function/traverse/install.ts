import { traverse } from './index';
import './types';

if (!Function.traverse) {
  Object.defineProperty(Function, 'traverse', {
    value: traverse,
    writable: true,
    configurable: true,
  });
}
