export * from './compose/install';
export * from './curry/install';
export * from './isFunction/install';
export * from './pipe/install';
export * from './uncurry/install';

import { installCompose } from './compose/install';
import { installCurry } from './curry/install';
import { installIsFunction } from './isFunction/install';
import { installPipe } from './pipe/install';
import { installUncurry } from './uncurry/install';

export function installFunctionExtensions() {
  installCompose();
  installCurry();
  installIsFunction();
  installPipe();
  installUncurry();
}
