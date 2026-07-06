import { cartesianProduct } from './index';
export * from './types';

export function installCartesianProduct() {
  if (!Array.cartesianProduct) {
    Object.defineProperty(Array, 'cartesianProduct', {
      value: cartesianProduct,
      writable: true,
      configurable: true,
    });
  }
}
