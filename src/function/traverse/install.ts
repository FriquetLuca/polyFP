import { traverse } from './index';
import './types';

export function installTraverse() {
  if (!Function.traverse) {
    Object.defineProperty(Function, 'traverse', {
      value: traverse,
      writable: true,
      configurable: true,
    });
  }
}
