import { installArrayExtensions } from './array/install';
import { installFunctionExtensions } from './function/install';
import { installObjectExtensions } from './object/install';

export function installAllExtensions() {
  installArrayExtensions();
  installFunctionExtensions();
  installObjectExtensions();
}
