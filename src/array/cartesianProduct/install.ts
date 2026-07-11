import { cartesianProduct } from './index';
export * from './types';

if (!Array.cartesianProduct) {
  Object.defineProperty(Array, 'cartesianProduct', {
    value: cartesianProduct,
    writable: true,
    configurable: true,
  });
}
