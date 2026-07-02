export * from './compose/install';
export * from './curry/install';
export * from './flip/install';
export * from './isFunction/install';
export * from './memoize/install';
export * from './partial/install';
export * from './pipe/install';
export * from './uncurry/install';

import { installCompose } from './compose/install';
import { installCurry } from './curry/install';
import { installFlip } from './flip/install';
import { installIsFunction } from './isFunction/install';
import { installMemoize } from './memoize/install';
import { installPartial } from './partial/install';
import { installPipe } from './pipe/install';
import { installUncurry } from './uncurry/install';

export function installFunctionExtensions() {
  installCompose();
  installCurry();
  installFlip();
  installIsFunction();
  installMemoize();
  installPartial();
  installPipe();
  installUncurry();
}
