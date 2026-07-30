import { segmentRounding } from './index.js';
export type * from './types';

if (!Math.segmentRounding) {
  Object.defineProperty(Math, 'segmentRounding', {
    value: segmentRounding,
    writable: true,
    configurable: true,
  });
}
