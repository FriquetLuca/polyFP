import { cartesianProduct } from './index.js';
export type * from './types';

if (!Array.cartesianProduct) {
  Object.defineProperty(Array, 'cartesianProduct', {
    value: cartesianProduct,
    writable: true,
    configurable: true,
  });
}
