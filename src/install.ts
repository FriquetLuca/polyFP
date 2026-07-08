export * from './array/install';
export * from './function/install';
export * from './math/install';
export * from './object/install';
export * from './string/install';

import { installArrayExtensions } from './array/install';
import { installFunctionExtensions } from './function/install';
import { installMathExtensions } from './math/install';
import { installObjectExtensions } from './object/install';
import { installStringExtensions } from './string/install';

export function installAllExtensions() {
  installArrayExtensions();
  installFunctionExtensions();
  installMathExtensions();
  installObjectExtensions();
  installStringExtensions();
}
