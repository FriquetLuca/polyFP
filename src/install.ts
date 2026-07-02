import { installFunctionExtensions } from './function/install';
import { installObjectExtensions } from './object/install';

export function installAllExtensions() {
  installObjectExtensions();
  installFunctionExtensions();
}
