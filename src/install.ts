export * from './array/install';
export * from './function/install';
export * from './math/install';
export * from './object/install';

import { installArrayExtensions } from './array/install';
import { installFunctionExtensions } from './function/install';
import { installMathExtensions } from './math/install';
import { installObjectExtensions } from './object/install';

export function installAllExtensions() {
  installArrayExtensions();
  installFunctionExtensions();
  installMathExtensions();
  installObjectExtensions();
}
