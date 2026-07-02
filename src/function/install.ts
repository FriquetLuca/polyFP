export * from './compose/install';
export * from './curry/install';
export * from './flip/install';
export * from './isFunction/install';
export * from './memoize/install';
export * from './partial/install';
export * from './pipe/install';
export * from './sequence/install';
export * from './tap/install';
export * from './traverse/install';
export * from './uncurry/install';

import { installCompose } from './compose/install';
import { installCurry } from './curry/install';
import { installFlip } from './flip/install';
import { installIsFunction } from './isFunction/install';
import { installMemoize } from './memoize/install';
import { installPartial } from './partial/install';
import { installPipe } from './pipe/install';
import { installSequence } from './sequence/install';
import { installTap } from './tap/install';
import { installTraverse } from './traverse/install';
import { installUncurry } from './uncurry/install';

export function installFunctionExtensions() {
  installCompose();
  installCurry();
  installFlip();
  installIsFunction();
  installMemoize();
  installPartial();
  installPipe();
  installSequence();
  installTap();
  installTraverse();
  installUncurry();
}
